// import styles from "../css/PlayerBox.module.css";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import PlayerRow from "./PlayerRow";
import PlayerTurn from "./PlayerTurn";

import { getPlayers, Player } from "./PlayerSlice";

const PlayerBox = ({ roomId, width, gameView }: { roomId: string; width?: string; gameView?: boolean }) => {
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

    socket.on("playerFromUrl", (roomId, assignedName) => {
      sessionStorage.setItem("roomId", roomId.trim());
      sessionStorage.setItem("playerName", assignedName.trim());
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
    <Box
      sx={{
        width: width || "auto",
        overflowY: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          pt: "1em",
        }}
        variant="h6"
      >
        {gameView ? "Players in game" : "Players in lobby"}
      </Typography>
      {gameView ? <PlayerTurn players={players}></PlayerTurn> : <PlayerRow players={players}></PlayerRow>}
    </Box>
  );
};

export default PlayerBox;
