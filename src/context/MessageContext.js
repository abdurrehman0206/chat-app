import React, { useState, useEffect, useContext, createContext } from "react";
import { supabase } from "../supabaseClient";
import { ChatContext } from "./ChatContext";
export const MessageContext = createContext();
const MessageContextProvider = ({ children }) => {
  const { data: chatData } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState({});

  useEffect(() => {
    const unsub = () => getInitialMessages();
    unsub();
    return () => unsub();
  }, [chatData]);
  const getInitialMessages = async () => {
    await supabase
      .from("chats")
      .select("messages[]")
      .eq("chat_id", chatData.chatId)
      .then((res) => {
        return res.data[0].messages;
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        console.log("INITITAL MESSSAGE ERROR : ", err);
      });
  };
  const getLiveFeed = () => {
    supabase
      .channel("chats")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chats",
          row: "messages[]",
        },
        (payload) => {
          setMessages(payload.new.messages);
          setLastMessage(messages[messages.length - 1]);
        }
      )
      .subscribe();
  };
  const unsubFromLiveFeed = async () => {
    supabase.removeAllChannels();
  };

  return (
    <MessageContext.Provider
      value={{ messages, lastMessage, getLiveFeed, unsubFromLiveFeed }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
