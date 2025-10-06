import React, { useState } from "react";
import styles from "../css/JoinServer.module.css";

const JoinRoom = ({ onClose }) => {
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleJoin = () => {
    console.log("Joining room with ID:", roomId, "and player name:", playerName);
    onClose();
  };

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Set Room Name</h2>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <h2>Set Player Name</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Player Name"
          />
          <div className={styles.modalActions}>
            <button onClick={handleJoin}>Join Room</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
