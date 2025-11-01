import { Player } from "../models/Player";
import { useState } from "react";
import { Button, List, ListItem, Tooltip, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { socket } from "../socket";

const PlayerRow = ({ players }: { players: Player[] }) => {
  const [editField, setEditField] = useState(false);
  const [newName, setNewName] = useState("");

  const playerName = sessionStorage.getItem("playerName");
  const roomId = sessionStorage.getItem("roomId");

  const editNameToggler = (name: string) => {
    setEditField(true);
    setNewName(name);
  };

  const editNameHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setEditField(false);
    socket.emit("editName", roomId, playerName, newName);
    sessionStorage.setItem("playerName", newName.trim());
    setNewName("");
  };

  return (
    <div>
      <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {players
          .filter((player) => player.isActive)
          .map((player, index) => (
            <ListItem
              sx={{
                border: "1px black solid",
                borderRadius: "5px",
                mb: ".5em",
                width: "90%",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {playerName === player.name ? (
                editField ? (
                  <form onSubmit={editNameHandler}>
                    <TextField value={newName} autoFocus onChange={(e) => setNewName(e.target.value)}></TextField>
                  </form>
                ) : (
                  `${player.name} ${player.role == "admin" ? "(admin)" : ""} ${
                    playerName == player.name ? "(you)" : ""
                  }`
                )
              ) : (
                `${player.name} ${player.role == "admin" ? "(admin)" : ""} ${playerName == player.name ? "(you)" : ""}`
              )}
              {playerName == player.name && (
                <Tooltip title="Edit Name">
                  <Button onClick={() => editNameToggler(player.name)}>
                    <EditNoteIcon sx={{ color: "grey" }} />
                  </Button>
                </Tooltip>
              )}
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default PlayerRow;
