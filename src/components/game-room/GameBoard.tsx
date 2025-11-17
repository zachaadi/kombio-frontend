import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../socket";

const GameBoard = () => {
  const players = useSelector((state: RootState) => state.player.players);
  const playerName = sessionStorage.getItem("playerName");
  const roomId = sessionStorage.getItem("roomId");

  let myTurn = false;

  const playerTurn = players.find((player) => player.isTurn == true);
  if (playerTurn) {
    if (playerTurn.name == playerName) {
      myTurn = true;
    }
  }

  const endTurnHandler = () => {
    socket.emit("nextTurn", roomId);
  };

  useEffect(() => {
    socket.on("yourTurn", () => {});

    return () => {
      socket.off("yourTurn");
    };
  }, []);

  return (
    <Box>
      <Button disabled={!myTurn} onClick={endTurnHandler} variant="contained">
        End Turn
      </Button>
    </Box>
  );
};

export default GameBoard;
