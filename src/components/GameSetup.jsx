import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "../css/GameSetup.module.css";

const GameSetup = ({ roomId }) => {
  return (
    <Box>
      <Typography variant={"h5"} sx={{ fontWeight: 700, pt: "1em" }}>
        Lobby Name: {roomId}
      </Typography>

      <Typography variant={"body1"} sx={{ pt: "1em" }}>
        Welcome to the lobby! Waiting for players to ready up...
      </Typography>
    </Box>
  );
};

export default GameSetup;
