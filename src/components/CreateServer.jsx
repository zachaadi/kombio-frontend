import React, { useState } from "react";
import styles from "../css/CreateServer.module.css";
import { socket } from "../socket";
import LobbyRoom from "./LobbyRoom";
import { useNavigate } from "react-router-dom";

const CreateServer = ({ onClose }) => {
  const [serverId, setServerId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    socket.emit("createRoom", serverId);
    onClose();
    navigate(`/lobby-room/${serverId}`);
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
            <button onClick={handleCreate}>Create Server</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServer;
