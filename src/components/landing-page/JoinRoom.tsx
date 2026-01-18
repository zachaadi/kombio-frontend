import React, { useState } from "react";
import styles from "../../css/JoinServer.module.css";
import { socket } from "../../app/socket";
import { Slide, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const JoinRoom = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setRoomId(roomId.trim().toUpperCase());
    setPlayerName(playerName.trim());
    socket.emit("joinRoom", roomId.trim().toUpperCase(), playerName.trim());
    sessionStorage.setItem("playerName", playerName.trim());
    sessionStorage.setItem("roomId", roomId.trim().toUpperCase());
    handleClose();
  };

  const handleClose = () => {
    setRoomId("");
    setPlayerName("");
    onClose();
  };

  return (
    <Dialog
      slots={{
        transition: Transition,
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className={styles.dialogTitle}>Join a room</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <form onSubmit={handleJoin}>
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
              placeholder="Enter Room ID"
            ></TextField>
          </Box>

          <DialogActions className={styles.dialogActions}>
            <Button
              sx={{
                borderRadius: "8px",
                border: "1px solid transparent",
                fontSize: "1em",
                fontWeight: 500,
                textTransform: "none",
              }}
              variant="contained"
              type="submit"
            >
              Join Room
            </Button>
            <Button
              sx={{
                borderRadius: "8px",
                border: "1px solid transparent",
                fontSize: "1em",
                fontWeight: 500,
                textTransform: "none",
              }}
              variant="contained"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRoom;
