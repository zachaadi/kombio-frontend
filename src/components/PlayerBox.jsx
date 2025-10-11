import React from "react";
import { Grid } from "@mui/material";
import styles from "../css/PlayerBox.module.css";
import { Paper, Box } from "@mui/material";

const PlayerBox = ({ players }) => {
  return (
    <Box sx={{ padding: "5em" }}>
      <h4>Players in lobby</h4>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </Box>
  );
};

export default PlayerBox;
