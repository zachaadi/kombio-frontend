import React from "react";
import { Grid } from "@mui/material";
import styles from "../css/GameSetup.module.css";

const GameSetup = ({ roomId }) => {
  return (
    <Grid item xs={12} md={6} className={styles.gameConfigureBox}>
      <h2>Lobby Name: {roomId}</h2>
      <p>Welcome to the lobby! Waiting for players to join...</p>
    </Grid>
  );
};

export default GameSetup;
