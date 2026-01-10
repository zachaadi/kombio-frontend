import { useParams } from "react-router-dom";
// import styles from "../css/LobbyRoom.module.css";
import { Container, Grid, Paper } from "@mui/material";
import GameSetup from "./GameSetup";
import PlayerBox from "../player/PlayerBox";
import ChatBox from "../chat/ChatBox";

const LobbyRoom = () => {
  const { roomId: roomId } = useParams();

  return (
    <Container
      sx={{
        minHeight: "calc(100vh - 64px)",
        minWidth: "100vw",
      }}
    >
      <Grid container spacing={1} sx={{ height: "calc(100vh - 64px - 16px)" }}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: "80%",
              overflowY: "auto",
            }}
          >
            <PlayerBox roomId={roomId || ""} />
          </Paper>
        </Grid>

        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: { xs: "80%", md: "100%" },
              overflowY: "auto",
            }}
          >
            <GameSetup roomId={roomId || ""} />
          </Paper>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 4 }}
        >
          <Paper
            sx={{
              height: "80%",
              width: "80%",
              overflowY: "auto",
            }}
          >
            <ChatBox roomId={roomId || ""} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LobbyRoom;
