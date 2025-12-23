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

  const getPlayerLayout = () => {
    const numPlayers = players.length;

    if (numPlayers === 2) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <PlayerHand key={players[1].name} name={players[1].name || ""} />
          <PlayerHand key={players[0].name} name={players[0].name || ""} />
        </Box>
      );
    }

    if (numPlayers === 3) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[1].name} name={players[1].name || ""} />
            <PlayerHand key={players[2].name} name={players[2].name || ""} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[0].name} name={players[0].name || ""} />
          </Box>
        </Box>
      );
    }

    if (numPlayers === 4) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[3].name} name={players[3].name || ""} />
          </Box>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[1].name} name={players[1].name || ""} />
            <PlayerHand key={players[2].name} name={players[2].name || ""} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[0].name} name={players[0].name || ""} />
          </Box>
        </Box>
      );
    }

    if (numPlayers === 5) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[3].name} name={players[3].name || ""} />
            <PlayerHand key={players[4].name} name={players[4].name || ""} />
          </Box>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[1].name} name={players[1].name || ""} />
            <PlayerHand key={players[2].name} name={players[2].name || ""} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[0].name} name={players[0].name || ""} />
          </Box>
        </Box>
      );
    }
    if (numPlayers === 6) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[5].name} name={players[5].name || ""} />
          </Box>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[3].name} name={players[3].name || ""} />
            <PlayerHand key={players[4].name} name={players[4].name || ""} />
          </Box>
          <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
            <PlayerHand key={players[1].name} name={players[1].name || ""} />
            <PlayerHand key={players[2].name} name={players[2].name || ""} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[0].name} name={players[0].name || ""} />
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box>
      <Button disabled={!myTurn} onClick={endTurnHandler} variant="contained">
        End Turn
      </Button>
      {getPlayerLayout()}
    </Box>
  );
};

export default GameBoard;
