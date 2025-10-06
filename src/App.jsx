import "./css/App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import { socket } from "./socket";
import LobbyRoom from "./components/LobbyRoom";

function App() {
  socket.connect();

  socket.on("connect", () => {
    console.log("socket connected: ", socket.id);
  });

  useEffect(() => {
    socket.on("roomCreated", (roomId) => {
      console.log("Room created with ID: ", roomId);
    });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/lobby-room/:roomId" element={<LobbyRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
