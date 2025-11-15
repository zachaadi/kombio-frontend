import { Player } from "../../state/Player/PlayerSlice";
import { Box, List, ListItem } from "@mui/material";

const PlayerTurn = ({ players }: { players: Player[] }) => {
  const playerName = sessionStorage.getItem("playerName");

  return (
    <Box>
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {players
          .filter((player) => player.isActive)
          .map((player, index) => (
            <ListItem
              sx={{
                border: player.isTurn == true ? "3px green solid" : "2px black solid",
                borderRadius: "5px",
                mb: ".5em",
                width: "90%",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {player.name} {player.role == "admin" ? "(admin)" : ""} {playerName == player.name ? "(you)" : ""}
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default PlayerTurn;
