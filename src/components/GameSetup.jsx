import React from "react";
import { Box } from "@mui/material";
import styles from "../css/GameSetup.module.css";

const GameSetup = ({ roomId }) => {
  return (
    <Box>
      <h2>Lobby Name: {roomId}</h2>
      <p>Welcome to the lobby! Waiting for players to ready up...</p>
    </Box>
  );
};

export default GameSetup;
