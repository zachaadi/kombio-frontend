import React, { useEffect } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import styles from "../css/GameSetup.module.css";
import { socket } from "../socket";

const GameSetup = ({ roomId }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    socket.emit("sendSnackbar", "info", "Copied!");
  };

  useEffect(() => {}, []);

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <Typography variant={"h5"} sx={{ fontWeight: 700, pt: "1em" }}>
        Lobby Name: {roomId}
      </Typography>

      <Paper sx={{ backgroundColor: "grey", mt: "1em", width: "80%" }}>
        <Grid container sx={{ justifyContent: "center", alignItems: "center" }} spacing={2}>
          <Grid item sx={{ pt: "1em" }}>
            <Typography variant={"h7"}>Invite friends to lobby</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontWeight: 700 }} variant={"h6"}>
              {window.location.href}
            </Typography>
          </Grid>
          <Grid item>
            <Button sx={{ mb: "1em" }} variant="contained" onClick={copyToClipboard}>
              Copy
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant={"body1"} sx={{ pt: "1em" }}>
        Welcome to the lobby! Waiting for players to ready up...
      </Typography>
    </Box>
  );
};

export default GameSetup;
