import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.js";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header.js";
import { Toolbar } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../src/app/store.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Toolbar />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
