import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/LobbyRoom.module.css";
import { socket } from "../socket";
import { Container, Box, Grid } from "@mui/material";

const LobbyRoom = () => {
  const { roomId: roomId } = useParams();
  const [players, setPlayers] = useState([]);

  socket.emit("getPlayers", roomId);

  useEffect(() => {
    socket.on("playersList", (players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item size={3} className={styles.playerListBox}>
          <h4>Players in lobby</h4>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player}</li>
            ))}
          </ul>
        </Grid>
        <Grid item size={6} className={styles.gameConfigureBox}>
          <h2>Lobby Name: {roomId}</h2>
          <p>Welcome to the lobby! Waiting for players to join...</p>
        </Grid>
        <Grid item size={3} className={styles.chatBox}>
          <h4>Chat box</h4>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LobbyRoom;
