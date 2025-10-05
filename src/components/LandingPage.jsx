import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../css/LandingPage.css";
import JoinServer from "./JoinServer";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinServer = () => {
    setIsModalOpen(true);
  };

  const createServer = () => {
    console.log("Create a server");
  };

  return (
    <div>
      <h1>Welcome to Kombio</h1>
      <button className="button-padding" onClick={joinServer}>
        Join a Server
      </button>
      <button onClick={createServer}>Create a Server</button>

      {isModalOpen && createPortal(<JoinServer onClose={() => setIsModalOpen(false)} />, document.body)}
    </div>
  );
};

export default LandingPage;
