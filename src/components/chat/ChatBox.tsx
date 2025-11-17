import { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, TextField, Button, List, ListItem } from "@mui/material";
// import styles from "../css/ChatBox.module.css";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../../app/socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setChat, Chat } from "./ChatSlice";

const ChatBox = ({ roomId, height, width }: { roomId: string; height?: string; width?: string }) => {
  const chat = useSelector((state: RootState) => state.chat.messages);
  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const playerName = sessionStorage.getItem("playerName");

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    socket.emit("getChat", roomId);

    const handleChat = (chatList: Chat[]) => {
      dispatch(setChat(chatList));
    };

    socket.on("chatList", (chatList) => {
      handleChat(chatList);
    });

    return () => {
      socket.off("chatList");
    };
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit("newChat", roomId, playerName, newMessage);
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
            minWidth: width || { xs: "50vw", md: "20vw" },
            height: height || { xs: "10vh", md: "60vh" },
            overflowY: "auto",
          }}
        >
          <List>
            {chat.map((msg, index) => (
              <ListItem key={index}>
                <b>{msg.name}</b>: {msg.message}
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Paper>
      </Box>

      <Box sx={{ pt: "1em", mt: "auto", margin: "0 auto", width: "100%" }}>
        <form onSubmit={handleSendMessage} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            label="Send a message"
            variant="filled"
            size="small"
          />
          <Button type="submit" sx={{ padding: "1.2em" }}>
            <SendIcon sx={{ color: newMessage.trim() !== "" ? "secondary" : "grey" }} />
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChatBox;
