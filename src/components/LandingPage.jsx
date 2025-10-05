import React from "react";
import "../css/LandingPage.css";

const LandingPage = () => {
  const joinServer = () => {
    console.log("Join a server");
  };

  const createServer = () => {
    console.log("Create a server");
  };

  return (
    <div>
      <h1>Welcome to the Kombio</h1>
      <button className="button-padding" onClick={joinServer}>
        Join a Server
      </button>
      <button onClick={createServer}>Create a Server</button>
    </div>
  );
};

export default LandingPage;
