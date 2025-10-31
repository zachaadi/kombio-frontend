import { Player } from "../models/Player";
import { List, ListItem } from "@mui/material";

const PlayerRow = ({ players }: { players: Player[] }) => {
  return (
    <div>
      {players
        .filter((player) => player.isActive)
        .map((player, index) => (
          <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ListItem sx={{ border: "1px black solid", borderRadius: "5px", mb: ".5em", width: "90%" }} key={index}>
              {player.name} {`(${player.role})`}
            </ListItem>
          </List>
        ))}
    </div>
  );
};

export default PlayerRow;
