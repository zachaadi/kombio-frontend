// import styles from "../css/PlayerBox.module.css";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../socket";
import PlayerRow from "./PlayerRow";
import { Player } from "../models/Player";

const PlayerBox = ({ roomId }: { roomId: string }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

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

    socket.on("kickPlayer", () => {
      sessionStorage.clear();
      navigate("/");
    });

    return () => {
      socket.off("playersList");
      socket.off("playerLeft");
      socket.off("kickPlayer");
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
