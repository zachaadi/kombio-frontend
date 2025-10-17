import React, { useState } from "react";
import styles from "../css/LandingPage.module.css";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import { Button, Container, Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import deck from "/deck.svg";

const LandingPage = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const joinRoom = () => {
    setIsJoinModalOpen(true);
  };

  const createRoom = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <Container>
      <Grid container direction={{ xs: "column", md: "row" }}>
        <Grid item>
          <Box>
            <img src={deck} className={styles.playingCards} alt="Playing Cards" />
          </Box>
        </Grid>

        <Grid item>
          <h1>Play Kombio online for free!</h1>
          <Grid spacing={2} container direction={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center">
            <Grid item>
              <Button
                sx={{
                  borderRadius: "8px",
                  border: "1px solid transparent",
                  fontSize: "1em",
                  fontWeight: 500,
                  backgroundColor: "#1a1a1a",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={joinRoom}
              >
                Join a Room
              </Button>
            </Grid>
            <Grid item>
              <Button
                sx={{
                  borderRadius: "8px",
                  border: "1px solid transparent",
                  fontSize: "1em",
                  fontWeight: 500,
                  backgroundColor: "#1a1a1a",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={createRoom}
              >
                Create a Room
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <JoinRoom open={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)}></JoinRoom>
      <CreateRoom open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}></CreateRoom>
    </Container>
  );
};

export default LandingPage;
