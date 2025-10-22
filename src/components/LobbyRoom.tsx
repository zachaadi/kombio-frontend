import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import styles from "../css/LobbyRoom.module.css";
import { socket } from "../socket";
import { Container, Grid, Paper } from "@mui/material";
import GameSetup from "./GameSetup";
import PlayerBox from "./PlayerBox";
import ChatBox from "./ChatBox";

const LobbyRoom = () => {
  const { roomId: roomId } = useParams();
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.emit("getPlayers", roomId);

    const handlePlayers = (players: string[]) => {
      setPlayers(players);
    };

    socket.on("playersList", (players) => {
      handlePlayers(players);
    });

    socket.on("playerLeft", (playerName) => {
      socket.emit("sendSnackbar", "info", `${playerName} left lobby!`);
      socket.emit("getPlayers", roomId);
    });

    return () => {
      socket.off("playersList");
      socket.off("playerLeft");
    };
  }, [roomId]);

  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 64px)",
        minWidth: "100vw",
      }}
    >
      <Grid container spacing={1} sx={{ height: "calc(100vh - 64px - 16px)" }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: "80%",
              overflowY: "auto",
            }}
          >
            <PlayerBox players={players} />
          </Paper>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: { xs: "80%", md: "100%" },
              overflowY: "auto",
            }}
          >
            <GameSetup roomId={roomId || ""} />
          </Paper>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: "80%",
              overflowY: "auto",
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
