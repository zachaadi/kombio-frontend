import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import { setGame, Game } from "./GameSlice";
import PlayerHand from "../player/PlayerHand";

const GameBoard = () => {
  const dispatch = useDispatch();
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
    socket.emit("newAction", roomId, `${playerName} ends turn`);
    socket.emit("nextTurn", roomId);
  };

  useEffect(() => {
    const handleGame = (game: Game) => {
      dispatch(setGame(game));
    };

    socket.on("viewedCard", (card) => {
      console.log(card);
    });

    socket.on("setGame", (game) => {
      handleGame(game);
    });

    socket.emit("getGame", roomId);

    return () => {
      socket.off("setGame");
      socket.off("viewedCard");
    };
  }, [roomId, dispatch]);

  return (
    <Box>
      <Button disabled={!myTurn} onClick={endTurnHandler} variant="contained">
        End Turn
      </Button>
      {players.map((player) => (
        <PlayerHand key={player.name} name={player.name || ""}></PlayerHand>
      ))}
    </Box>
  );
};

export default GameBoard;
