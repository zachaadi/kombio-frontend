import { Player } from "../models/Player";
import { useState } from "react";
import { Button, List, ListItem, Tooltip, TextField } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import { socket } from "../socket";

const PlayerRow = ({ players }: { players: Player[] }) => {
  const [editField, setEditField] = useState(false);
  const [newName, setNewName] = useState("");

  const playerName = sessionStorage.getItem("playerName");
  const roomId = sessionStorage.getItem("roomId");

  const editNameToggler = (name: string) => {
    setEditField(!editField);
    setNewName(name);
  };

  const removePlayer = (name: string) => {
    socket.emit("removePlayer", roomId, name);
    socket.emit("sendSnackbar", "info", `${name} removed from lobby`);
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
                border: player.isReady == true ? "2px green solid" : "2px black solid",
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
              {playerName == player.name ? (
                <Tooltip title="Edit Name">
                  <Button onClick={() => editNameToggler(player.name)}>
                    <EditNoteIcon sx={{ color: "grey" }} />
                  </Button>
                </Tooltip>
              ) : players.find((player) => player.name == playerName)?.role == "admin" ? (
                <Tooltip title="Remove Player">
                  <Button onClick={() => removePlayer(player.name)}>
                    <CloseIcon sx={{ color: "red" }} />
                  </Button>
                </Tooltip>
              ) : (
                ""
              )}
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default PlayerRow;
