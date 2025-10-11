import React from "react";
import { Grid } from "@mui/material";
import styles from "../css/ChatBox.module.css";

const ChatBox = () => {
  return (
    <Grid item xs={12} md={3} className={styles.chatBox}>
      <h4>Chat box</h4>
    </Grid>
  );
};

export default ChatBox;
