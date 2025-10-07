import "./css/App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import { socket } from "./socket";
import LobbyRoom from "./components/LobbyRoom";
import { useNavigate } from "react-router-dom";
import RulesPage from "./components/RulesPage";
import StatsPage from "./components/StatsPage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("socket connected: ", socket.id);
    });

    socket.on("roomCreated", (roomId) => {
      console.log("Room created with ID: ", roomId);
      navigate(`/lobby-room/${roomId}`);
    });

    socket.on("roomJoined", (roomId) => {
      console.log("Joined room with ID: ", roomId);
      navigate(`/lobby-room/${roomId}`);
    });

    socket.on("error", (errorMessage) => {
      console.error("Socket error: ", errorMessage);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("roomCreated");
    };
  }, []);

  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/lobby-room/:roomId" element={<LobbyRoom />} />
      <Route path="/rules" element={<RulesPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}

export default App;
