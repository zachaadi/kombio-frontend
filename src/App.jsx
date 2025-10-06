import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./components/LandingPage";
import { socket } from "./socket";

function App() {
  socket.connect();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
