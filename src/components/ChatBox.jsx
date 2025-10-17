import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "../css/ChatBox.module.css";

const ChatBox = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          pt: "1em"
        }}
        variant="h6"
      >
        Chat box
      </Typography>
    </Box>
  );
};

export default ChatBox;
