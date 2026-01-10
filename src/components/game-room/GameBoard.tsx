import { Box, Button, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { socket } from "../../app/socket";
import { setGame, Game } from "./GameSlice";
import PlayerHand from "../player/PlayerHand";
import deck from "/deck.svg";

const GameBoard = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.player.players);
  const playerName = sessionStorage.getItem("playerName");
  const roomId = sessionStorage.getItem("roomId");
  const playerIndex = players.findIndex((player) => player.name == playerName);
  const myTurn = players.find((player) => player.isTurn == true)?.name == playerName;

  const endTurnHandler = () => {
    socket.emit("newAction", roomId, `${playerName} ends turn`);
    socket.emit("nextTurn", roomId);
  };

  const handleDrawCard = () => {
    socket.emit("drawCard", roomId, playerName);
    socket.emit("newAction", roomId, `${playerName} draws card`);
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

  const getPlayerLayout = () => {
    const numPlayers = players.length;

    if (numPlayers === 2) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <PlayerHand
            key={players[(playerIndex + 1) % players.length].name}
            name={players[(playerIndex + 1) % players.length].name || ""}
          />

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Box sx={{ pt: "2em", pb: "2em" }}>
              <Box>Deck</Box>
              <Tooltip title={"Draw card"}>
                <Box
                  onClick={handleDrawCard}
                  sx={{
                    "&:hover": { cursor: "pointer", border: "1px blue solid", borderRadius: "5px" },
                    height: "5em",
                  }}
                  component={"img"}
                  src={deck}
                />
              </Tooltip>
            </Box>

            <Box sx={{ pt: "2em", pb: "2em" }}>
              <Box>Discard</Box>
              <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
            </Box>
          </Box>

          <PlayerHand key={players[playerIndex].name} name={players[playerIndex].name || ""} />
        </Box>
      );
    }

    if (numPlayers === 3) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 1) % players.length].name}
              name={players[(playerIndex + 1) % players.length].name || ""}
            />
            <PlayerHand
              key={players[(playerIndex + 2) % players.length].name}
              name={players[(playerIndex + 2) % players.length].name || ""}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Box sx={{ pt: "2em", pb: "2em" }}>
              <Box>Deck</Box>
              <Tooltip title={"Draw card"}>
                <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
              </Tooltip>
            </Box>

            <Box sx={{ pt: "2em", pb: "2em" }}>
              <Box>Discard</Box>
              <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[playerIndex].name} name={players[playerIndex].name || ""} />
          </Box>
        </Box>
      );
    }

    if (numPlayers === 4) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 2) % players.length].name}
              name={players[(playerIndex + 2) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 1) % players.length].name}
              name={players[(playerIndex + 1) % players.length].name || ""}
            />

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Deck</Box>
                <Tooltip title={"Draw card"}>
                  <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
                </Tooltip>
              </Box>

              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Discard</Box>
                <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
              </Box>
            </Box>

            <PlayerHand
              key={players[(playerIndex + 3) % players.length].name}
              name={players[(playerIndex + 3) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[playerIndex].name} name={players[playerIndex].name || ""} />
          </Box>
        </Box>
      );
    }

    if (numPlayers === 5) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 2) % players.length].name}
              name={players[(playerIndex + 2) % players.length].name || ""}
            />
            <PlayerHand
              key={players[(playerIndex + 3) % players.length].name}
              name={players[(playerIndex + 3) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 1) % players.length].name}
              name={players[(playerIndex + 1) % players.length].name || ""}
            />

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Deck</Box>
                <Tooltip title={"Draw card"}>
                  <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
                </Tooltip>
              </Box>

              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Discard</Box>
                <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
              </Box>
            </Box>

            <PlayerHand
              key={players[(playerIndex + 4) % players.length].name}
              name={players[(playerIndex + 4) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[playerIndex].name} name={players[playerIndex].name || ""} />
          </Box>
        </Box>
      );
    }
    if (numPlayers === 6) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 3) % players.length].name}
              name={players[(playerIndex + 3) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 2) % players.length].name}
              name={players[(playerIndex + 2) % players.length].name || ""}
            />

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Deck</Box>
                <Tooltip title={"Draw card"}>
                  <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
                </Tooltip>
              </Box>
            </Box>

            <PlayerHand
              key={players[(playerIndex + 4) % players.length].name}
              name={players[(playerIndex + 4) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <PlayerHand
              key={players[(playerIndex + 1) % players.length].name}
              name={players[(playerIndex + 1) % players.length].name || ""}
            />

            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Box sx={{ pt: "2em", pb: "2em" }}>
                <Box>Discard</Box>
                <Box sx={{ "&:hover": { cursor: "pointer" }, height: "5em" }} component={"img"} src={deck} />
              </Box>
            </Box>

            <PlayerHand
              key={players[(playerIndex + 5) % players.length].name}
              name={players[(playerIndex + 5) % players.length].name || ""}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PlayerHand key={players[playerIndex].name} name={players[playerIndex].name || ""} />
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
