import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/LobbyRoom.module.css";
import { socket } from "../socket";

const LobbyRoom = () => {
  const { roomId: roomId } = useParams();
  const [players, setPlayers] = useState([]);

  socket.emit("getPlayers", roomId);

  useEffect(() => {
    socket.on("playersList", (players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <div>
      <h2>Lobby Room: {roomId}</h2>
      <p>Welcome to the lobby! Waiting for players to join...</p>

      <div className={styles.playerList}>
        <h4>Players in lobby:</h4>
        <ul>
          {players.map((player, index) => (
            <li key={index}>{player}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LobbyRoom;
