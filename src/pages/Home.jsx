import React from "react";
import SidePanel from "../Components/SidePanel";
import ChatPanel from "../Components/ChatPanel";

function Home() {
  return (
    <div className="home--wrap center--flexed">
      <div className="home--container">
        <SidePanel />
        <ChatPanel />
      </div>
    </div>
  );
}

export default Home;
