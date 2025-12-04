import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import { setGame, Game } from "./GameSlice";

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

    socket.on("setGame", (game) => {
      handleGame(game);
    });

    socket.emit("getGame", roomId);

    return () => {
      socket.off("setGame");
    };
  }, [roomId, dispatch]);

  return (
    <Box>
      <Button disabled={!myTurn} onClick={endTurnHandler} variant="contained">
        End Turn
      </Button>
      <div>
        <ul>
          {players
            .find((player) => player.name == playerName)
            ?.hand.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
        </ul>
      </div>
    </Box>
  );
};

export default GameBoard;
