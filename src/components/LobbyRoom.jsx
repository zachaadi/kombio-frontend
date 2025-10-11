import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/LobbyRoom.module.css";
import { socket } from "../socket";
import { Container, Box, Grid, Paper } from "@mui/material";
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
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Grid container spacing={2} sx={{ height: "calc(100vh - 64px - 16px)" }}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              height: "80%",
              overflow: "hidden",
              marginRight: "10em",
            }}
          >
            <PlayerBox players={players} />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              height: "80%",
              overflow: "hidden",
            }}
          >
            <GameSetup roomId={roomId} />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              height: "80%",
              overflow: "hidden",
              marginLeft: "10em",
            }}
          >
            <ChatBox />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LobbyRoom;
