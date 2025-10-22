import React, { useState } from "react";
import styles from "../css/CreateServer.module.css";
import { socket } from "../socket";
import { Slide, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateRoom = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setRoomId(roomId.trim());
    setPlayerName(playerName.trim());
    socket.emit("createRoom", roomId.trim(), playerName.trim());
    sessionStorage.setItem("playerName", playerName.trim());
    sessionStorage.setItem("roomId", roomId.trim());
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

          <DialogActions className={styles.dialogActions}>
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
              type="submit"
            >
              Create Room
            </Button>
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

export default CreateRoom;
