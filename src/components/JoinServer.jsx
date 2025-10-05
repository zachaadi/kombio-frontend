import React, { useState } from "react";
import "../css/JoinServer.css";

const JoinServer = ({ onClose }) => {
  const [serverId, setServerId] = useState("");
  const [playerName, setPlayerName] = useState("");

  const handleJoin = () => {
    console.log("Joining server with ID:", serverId, "and player name:", playerName);
    onClose();
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <h2>Set Server Name</h2>
          <input
            type="text"
            value={serverId}
            onChange={(e) => setServerId(e.target.value)}
            placeholder="Set Server ID"
          />
          <h2>Set Player Name</h2>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Set Player Name"
          />
          <div className="modal-actions">
            <button onClick={handleJoin}>Join Server</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinServer;
