import React, { useState } from "react";
import styles from "../css/CreateServer.module.css";
import { socket } from "../socket";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const CreateRoom = ({ open, onClose }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    socket.emit("createRoom", roomId, playerName);
    handleClose();
  };

  const handleClose = () => {
    setRoomId("");
    setPlayerName("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className={styles.dialogTitle}>Create a room</DialogTitle>
      <DialogContent>
        <form onSubmit={handleCreate}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              required
              onChange={(e) => setPlayerName(e.target.value)}
              value={playerName}
              placeholder="Enter Name"
            ></TextField>
            <TextField
              required
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              placeholder="Set Room ID"
            ></TextField>
          </Box>

          <DialogActions>
            <Button type="submit">Create Room</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
