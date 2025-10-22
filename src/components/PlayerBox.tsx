// import styles from "../css/PlayerBox.module.css";
import { Box, Typography, List, ListItem } from "@mui/material";

const PlayerBox = ({ players }: { players: string[] }) => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          pt: "1em",
        }}
        variant="h6"
      >
        Players in lobby
      </Typography>
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {players.map((player, index) => (
          <ListItem sx={{ border: "1px black solid", borderRadius: "5px", mb: ".5em", width: "90%" }} key={index}>
            {player}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlayerBox;
