import { Box, Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import GameBoard from "./GameBoard";
import ChatBox from "../chat/ChatBox";
import PlayerBox from "../player/PlayerBox";
import ActionsBox from "./ActionsBox";

const GameRoom = () => {
  const { roomId: roomId } = useParams();

  return (
    <Box sx={{ width: "100vw", height: "calc(100vh - 64px - 16px)" }}>
      <Grid container spacing={1} sx={{margin: "1em"}}>
        <Grid size={{ xs: 10, md: 8 }}>
          <Paper sx={{ height: "100%"}}>
            <GameBoard></GameBoard>
          </Paper>
        </Grid>

        <Grid size={{ xs: 2, md: 4 }}>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
          >
            <Grid>
              <Paper>
                <ChatBox roomId={roomId || ""} height="10vh" width="20vw"></ChatBox>
              </Paper>
            </Grid>
            <Grid>
              <Paper>
                <PlayerBox roomId={roomId || ""} width="20vw" gameView={true}></PlayerBox>
              </Paper>
            </Grid>
            <Grid>
              <Paper>
                <ActionsBox roomId={roomId || ""}></ActionsBox>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameRoom;
