import React, { useState } from "react";
import { createPortal } from "react-dom";
import styles from "../css/LandingPage.module.css";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

const LandingPage = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const joinRoom = () => {
    setIsJoinModalOpen(true);
  };

  const createRoom = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div>
      <h1>Play Kombio online for free!</h1>
      <button className={styles.buttonPadding} onClick={joinRoom}>
        Join a Room
      </button>
      <button onClick={createRoom}>Create a Room</button>

      {isJoinModalOpen && createPortal(<JoinRoom onClose={() => setIsJoinModalOpen(false)} />, document.body)}

      {isCreateModalOpen && createPortal(<CreateRoom onClose={() => setIsCreateModalOpen(false)} />, document.body)}
    </div>
  );
};

export default LandingPage;
