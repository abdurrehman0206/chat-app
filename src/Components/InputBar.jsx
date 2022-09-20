import React, { useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { ChatContext } from "../context/ChatContext";
import { UserContext } from "../context/UserContext";
function InputBar() {
  const [text, setText] = useState("");
  const { session } = useContext(UserContext);
  const { data: chatData } = useContext(ChatContext);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (text && chatData.chatId) {
      await supabase
        .from("chats")
        .select("messages[]")
        .eq("chat_id", chatData.chatId)
        .then((res) => {
          return res.data[0].messages;
        })
        .then(async (data) => {
          data.push({
            senderId: session.user.id,
            message: text,
            send_at: new Date(),
          });
          await supabase
            .from("chats")
            .update({ messages: data })
            .eq("chat_id", chatData.chatId)
            .then(() => setText(""));
        });
    }
  };
  return chatData.chatId !== null ? (
    <form onSubmit={sendMessage}>
      <div className="inputbar">
        <input
          type="text"
          placeholder="Type anything . . . "
          value={text || ""}
          onChange={(e) => setText(e.target.value)}
        />
        <button>Send</button>
      </div>
    </form>
  ) : null;
}

export default InputBar;
