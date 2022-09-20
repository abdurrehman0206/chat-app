import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextProvider from "./context/UserContext";
import ChatContextProvider from "./context/ChatContext";
import MessageContextProvider from "./context/MessageContext";
import FriendListContextProvider from "./context/FriendListContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <ChatContextProvider>
      <MessageContextProvider>
        <FriendListContextProvider>
          <App />
        </FriendListContextProvider>
      </MessageContextProvider>
    </ChatContextProvider>
  </UserContextProvider>
);
