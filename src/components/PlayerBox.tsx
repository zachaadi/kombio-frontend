// import styles from "../css/PlayerBox.module.css";
import { Box, Typography, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { socket } from "../socket";

interface Player {
  name: string;
  isReady: boolean;
  role: string;
}

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
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {players.map((player, index) => (
          <ListItem sx={{ border: "1px black solid", borderRadius: "5px", mb: ".5em", width: "90%" }} key={index}>
            {player.name} {`(${player.role})`}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlayerBox;
