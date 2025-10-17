import React from "react";
import { Grid } from "@mui/material";
import styles from "../css/PlayerBox.module.css";
import { Paper, Box, Typography } from "@mui/material";

const PlayerBox = ({ players }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          pt: "1em"
        }}
        variant="h6"
      >
        Players in lobby
      </Typography>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </Box>
  );
};

export default PlayerBox;
