import { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, TextField, Button, List, ListItem } from "@mui/material";
// import styles from "../css/ChatBox.module.css";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket";
import { ChatMessage } from "../models/ChatMessage";

const ChatBox = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const playerName = sessionStorage.getItem("playerName");

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.emit("getMessages", roomId);

    const handleMessages = (incomingMessages: ChatMessage[]) => {
      setMessages(incomingMessages);
    };

    socket.on("messageList", (incomingMessages) => {
      handleMessages(incomingMessages);
    });

    return () => {
      socket.off("messageList");
    };
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit("newMessage", roomId, playerName, newMessage);
      setNewMessage("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            pt: "1em",
          }}
          variant="h6"
        >
          Chat box
        </Typography>
        <Paper
          sx={{
            minWidth: { xs: "50vw", md: "20vw" },
            height: { xs: "10vh", md: "60vh" },
            overflowY: "auto",
          }}
        >
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <b>{msg.name}</b>: {msg.message}
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Paper>
      </Box>

      <Box sx={{ pt: "1em", mt: "auto", margin: "0 auto" }}>
        <form onSubmit={handleSendMessage}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            label="Send a message"
            variant="filled"
            size="small"
          />
          <Button type="submit" sx={{ padding: "1.2em" }}>
            <SendIcon sx={{ color: "grey" }} />
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChatBox;
