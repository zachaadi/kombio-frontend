import "./css/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import { socket } from "./socket";
import LobbyRoom from "./components/LobbyRoom";
import { useNavigate } from "react-router-dom";
import RulesPage from "./components/RulesPage";
import StatsPage from "./components/StatsPage";
import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

function App() {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

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
      setOpenSnackbar(true);
      setSnackMessage(errorMessage);
    });

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("roomCreated");
    };
  }, []);

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" variant="filled" sx={{ width: "100%" }}>{snackMessage}</Alert>
      </Snackbar>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/lobby-room/:roomId" element={<LobbyRoom />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;
