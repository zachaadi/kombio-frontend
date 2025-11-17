import "../css/App.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "../components/landing-page/LandingPage";
import { socket } from "./socket";
import LobbyRoom from "../components/lobby-room/LobbyRoom";
import RulesPage from "../components/header/RulesPage";
import StatsPage from "../components/header/StatsPage";
import GameRoom from "../components/game-room/GameRoom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function App() {
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "info" | "success" | "warning">("info");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      const playerName = sessionStorage.getItem("playerName");
      const roomId = sessionStorage.getItem("roomId");
      if (playerName && roomId) {
        socket.emit("reJoinRoom", roomId, playerName);
      } else {
        if (window.location.href.includes("/lobby-room/")) {
          const roomId = window.location.href.substring(33);
          socket.emit("joinFromUrl", roomId);
        }
      }
    });

    socket.on("roomCreated", (roomId) => {
      console.log("Room created with ID: ", roomId);
      navigate(`/lobby-room/${roomId}`);
    });

    socket.on("roomJoined", (roomId) => {
      navigate(`/lobby-room/${roomId}`);
    });

    socket.on("connect_error", () => {
      setOpenSnackbar(true);
      setSnackMessage("Cannot connect to server");
      setSeverity("error");
    });

    socket.on("sendSnackbar", (severity, message) => {
      setOpenSnackbar(true);
      setSnackMessage(message);
      setSeverity(severity);
    });

    return () => {
      socket.off("connect");
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("error");
      socket.off("connect_error");
    };
  }, [navigate]);

  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {snackMessage}
        </Alert>
      </Snackbar>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/lobby-room/:roomId" element={<LobbyRoom />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/game-room/:roomId" element={<GameRoom />} />
      </Routes>
    </div>
  );
}

export default App;
