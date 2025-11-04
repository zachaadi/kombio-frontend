// import styles from "../css/PlayerBox.module.css";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { socket } from "../socket";
import PlayerRow from "./PlayerRow";
import { Player } from "../models/Player";
import { getPlayers } from "../state/Player/PlayerSlice";

const PlayerBox = ({ roomId }: { roomId: string }) => {
  const players = useSelector((state: RootState) => state.player.players);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getPlayers", roomId);

    const handlePlayers = (players: Player[]) => {
      dispatch(getPlayers(players));
    };

    socket.on("playersList", (playerList) => {
      handlePlayers(playerList);
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
