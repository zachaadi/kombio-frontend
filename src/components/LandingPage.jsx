import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../css/LandingPage.module.css";
import JoinServer from "./JoinServer";
import CreateServer from "./CreateServer";

const LandingPage = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const joinServer = () => {
    setIsJoinModalOpen(true);
  };

  const createServer = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      <h1>Play Kombio online for free!</h1>
      <button className={styles.buttonPadding} onClick={joinServer}>
        Join a Server
      </button>
      <button onClick={createServer}>Create a Server</button>

      {isJoinModalOpen && createPortal(<JoinServer onClose={() => setIsJoinModalOpen(false)} />, document.body)}

      {isCreateModalOpen && createPortal(<CreateServer onClose={() => setIsCreateModalOpen(false)} />, document.body)}
    </div>
  );
};

export default LandingPage;
