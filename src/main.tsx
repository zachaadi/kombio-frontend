import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import { Toolbar } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Toolbar />
      <App />
    </BrowserRouter>
  </StrictMode>
);
