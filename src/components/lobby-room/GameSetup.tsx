import { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
// import styles from "../css/GameSetup.module.css";
import { socket } from "../../app/socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { setGame } from "../game-room/GameSlice";

const GameSetup = ({ roomId }: { roomId: string }) => {
  const [readyUp, setReadyUp] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.player.players);

  const playerName = sessionStorage.getItem("playerName");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    socket.emit("sendSnackbar", "info", "Copied!");
  };

  const readyUpHandler = () => {
    setReadyUp(!readyUp);
    socket.emit("readyUp", roomId, playerName);
  };

  const startGameHandler = () => {
    socket.emit("beginGame", roomId);
  };

  useEffect(() => {
    socket.on("allReady", () => {
      setDisabled(false);
    });

    socket.on("notReady", () => {
      setDisabled(true);
    });

    socket.on("beginningGame", (game) => {
      dispatch(setGame(game));
      navigate(`/game-room/${roomId}`);
    });

    return () => {
      socket.off("allReady");
      socket.off("notReady");
      socket.off("beginningGame");
    };
  }, [roomId, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={"h5"} sx={{ fontWeight: 700, pt: "1em" }}>
        Lobby Name: {roomId}
      </Typography>

      <Paper sx={{ backgroundColor: "grey", mt: "1em", width: "80%" }}>
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
          <Grid sx={{ pt: "1em" }}>
            <Typography variant={"h6"}>Invite friends to lobby</Typography>
          </Grid>
          <Grid>
            <Typography sx={{ fontWeight: 700 }} variant={"h6"}>
              {window.location.href}
            </Typography>
          </Grid>
          <Grid>
            <Button sx={{ mb: "1em" }} variant="contained" onClick={copyToClipboard}>
              Copy
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant={"body1"} sx={{ pt: "1em" }}>
        Welcome to the lobby! Waiting for admin to start game...
      </Typography>
      <Grid sx={{ pb: "1em", pt: "1em" }} container spacing={{ xs: 2 }} direction={{ xs: "column", md: "row" }}>
        <Grid>
          <Button
            color={readyUp ? "success" : "info"}
            sx={{ paddingLeft: "1.75em", paddingRight: "1.75em" }}
            onClick={readyUpHandler}
            variant="contained"
          >
            Ready up
          </Button>
        </Grid>
        <Grid>
          {players.find((player) => player.name == playerName)?.role == "admin" ? (
            <Button disabled={disabled} onClick={startGameHandler} variant="contained">
              Start Game
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameSetup;
