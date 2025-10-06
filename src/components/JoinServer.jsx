import React, { useState } from "react";
import styles from "../css/JoinServer.module.css";

const JoinServer = ({ onClose }) => {
  const [serverId, setServerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleJoin = () => {
    console.log("Joining server with ID:", serverId, "and player name:", playerName);
    onClose();
  };

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Set Server Name</h2>
          <input
            type="text"
            value={serverId}
            onChange={(e) => setServerId(e.target.value)}
            placeholder="Enter Server ID"
          />
          <h2>Set Player Name</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter Player Name"
          />
          <div className={styles.modalActions}>
            <button onClick={handleJoin}>Join Server</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinServer;
