import React from "react";
import { useParams } from "react-router-dom";

const LobbyRoom = () => {
  const { roomId: serverId } = useParams();
  
  return (
    <div>
      <h2>Lobby Room: {serverId}</h2>
      <p>Welcome to the lobby! Waiting for players to join...</p>
    </div>
  );
};

export default LobbyRoom;
