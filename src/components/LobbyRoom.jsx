import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/LobbyRoom.module.css";
import { socket } from "../socket";
import { Container, Box, Grid } from "@mui/material";
import GameSetup from "./GameSetup";
import PlayerBox from "./PlayerBox";
import ChatBox from "./ChatBox";

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
    <Container
      maxWidth={false}
      sx={{
        border: "1px solid red",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Grid container spacing={10}>
        <PlayerBox players={players} />
        <GameSetup roomId={roomId} />
        <ChatBox />
      </Grid>
    </Container>
  );
};

export default LobbyRoom;
