import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Paper, TextField, Grid, Button, List, ListItem } from "@mui/material";
import styles from "../css/ChatBox.module.css";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      socket.emit("chatMessage", newMessage);
      setNewMessage("");
    }
  };

  useEffect(() => {
    socket.on("chatMessage", (playerName, message) => {
      setMessages((prevMessages) => [...prevMessages, { playerName, message }]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

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
                {msg.playerName}: {msg.message}
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
