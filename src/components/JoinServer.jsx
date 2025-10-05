import React, { useState } from "react";
import "../css/JoinServer.css";

const JoinServer = ({ onClose }) => {
  const [serverId, setServerId] = useState("");

  const handleJoin = () => {
    console.log("Joining server with ID:", serverId);
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Server ID</h2>
        <input type="text" value={serverId} onChange={(e) => setServerId(e.target.value)} placeholder="Server ID" />
        <div className="modal-actions">
          <button onClick={handleJoin}>Join</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JoinServer;
