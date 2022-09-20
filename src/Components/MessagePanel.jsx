import React, { useState, useContext, useEffect } from "react";
import Message from "./Message";
import { supabase } from "../supabaseClient";
import { ChatContext } from "../context/ChatContext";
import { UserContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
function MessagePanel(props) {
  const { session } = useContext(UserContext);
  const { data: chatData, dispatch } = useContext(ChatContext);
  const { messages, getLiveFeed } = useContext(MessageContext);
  
  useEffect(() => {
    const unsub = () => getLiveFeed();
    unsub();
    return () => {
      unsub();
    };
  }, [chatData]);
  let messageElements = messages
    ? messages.map((message, i) => {
        return <Message key={i} message={message} />;
      })
    : null;

  return (
    <div className="messagepanel">
      <div className="chat--header center--flexed">
        <h3>{chatData.user.username}</h3>
      </div>
      {chatData.chatId !== null ? messageElements : ""}
    </div>
  );
}

export default MessagePanel;
