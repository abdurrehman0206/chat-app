import React from "react";
import InputBar from "./InputBar";
import MessagePanel from "./MessagePanel";

function ChatPanel() {
  return (
    <div className="chatpanel">
      <MessagePanel />
      <InputBar />
    </div>
  );
}

export default ChatPanel;
