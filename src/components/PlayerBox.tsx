// import styles from "../css/PlayerBox.module.css";
import { Box, Typography, List } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import PlayerRow from "./PlayerRow";
import { Player } from "../models/Player";

const PlayerBox = ({ roomId }: { roomId: string }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    socket.emit("getPlayers", roomId);

    const handlePlayers = (players: Player[]) => {
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
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          pt: "1em",
        }}
        variant="h6"
      >
        Players in lobby
      </Typography>
      <PlayerRow players={players}></PlayerRow>
    </Box>
  );
};

export default PlayerBox;
