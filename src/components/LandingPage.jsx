import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../css/LandingPage.module.css";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import { Container, Box, Grid } from "@mui/material";
import deck from "/deck.svg";

const LandingPage = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const joinRoom = () => {
    setIsJoinModalOpen(true);
  };

  const createRoom = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <Container>
      <Grid container spacing={10}>
        <Grid item size={6} alignItems="center" justifyContent="center">
          <img src={deck} className={styles.playingCards} alt="Playing Cards" />
        </Grid>
        <Grid
          item
          size={6}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
          <Box>
            <h1>Play Kombio online for free!</h1>
            <button className={styles.buttonPadding} onClick={joinRoom}>
              Join a Room
            </button>
            <button onClick={createRoom}>Create a Room</button>
          </Box>
        </Grid>
      </Grid>

      {isJoinModalOpen && createPortal(<JoinRoom onClose={() => setIsJoinModalOpen(false)} />, document.body)}

      {isCreateModalOpen && createPortal(<CreateRoom onClose={() => setIsCreateModalOpen(false)} />, document.body)}
    </Container>
  );
};

export default LandingPage;
