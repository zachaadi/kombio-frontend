import React, { useState } from "react";
import styles from "../css/CreateServer.module.css";
import { socket } from "../socket";

const CreateRoom = ({ onClose }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleCreate = () => {
    socket.emit("createRoom", roomId);
    onClose();
  };

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Set Room Name</h2>
          <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Enter Room ID" />
          <h2>Set Player Name</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Player Name"
          />
          <div className={styles.modalActions}>
            <button onClick={handleCreate}>Create Room</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
