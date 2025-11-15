import { useState } from "react";
// import styles from "../css/LandingPage.module.css";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import { Button, Container, Box, Grid, Typography } from "@mui/material";
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
      <Grid spacing={{ xs: 2, md: 10 }} container direction={{ xs: "column", md: "row" }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Box
              component={"img"}
              src={deck}
              sx={{
                display: "block",
                width: "100%",
                maxWidth: { xs: "20vw", sm: "20vw", md: "30vw", lg: "40vw" },
                height: "auto",
                objectFit: "contain",
                mx: "auto",
              }}
            ></Box>
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, fontSize: { xs: "2em", sm: "3em", md: "4em" } }}>
            Play Kombio online for free!
          </Typography>
          <Grid
            spacing={2}
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: "1em" }}
          >
            <Grid>
              <Button
                sx={{
                  borderRadius: "8px",
                  border: "1px solid transparent",
                  fontSize: "1em",
                  fontWeight: 500,
                  backgroundColor: "#1a1a1a",
                  textTransform: "none",
                  paddingLeft: "1.5em",
                  paddingRight: "1.5em",
                }}
                variant="contained"
                onClick={joinRoom}
              >
                Join a Room
              </Button>
            </Grid>
            <Grid>
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
