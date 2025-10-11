import React from "react";
import { Grid } from "@mui/material";
import styles from "../css/PlayerBox.module.css";

const PlayerBox = ({ players }) => {
  return (
    <Grid item xs={12} md={3} className={styles.playerListBox}>
      <h4>Players in lobby</h4>
      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </Grid>
  );
};

export default PlayerBox;
