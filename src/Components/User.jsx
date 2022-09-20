import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";
import { MessageContext } from "../context/MessageContext";
function User(props) {
  const { session } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);
  const { lastMessage } = useContext(MessageContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const unsub = () => getUser();
    unsub();
    return () => unsub();
  }, [props.user_id, lastMessage]);
  const getUser = async () => {
    await supabase
      .from("profiles")
      .select("id, username, avatar ")
      .eq("id", props.user_id)
      .then((res) => {
        if (res.data[0]) {
          return res.data[0];
        }
      })
      .then((data) => setUser(data));
  };

  // const removeFriend = async () => {
  //   unsubFromLiveFeed();
  //   await chatDelete();
  //   await friendListUpdate(user.id, session.user.id);
  //   await friendListUpdate(session.user.id, user.id);
  //   props.removed();
  //   setUser([]);
  //   dispatch({ type: "REMOVE_USER", payload: null });
  // };

  // const friendListUpdate = async (userID, currentUserID) => {
  //   await supabase
  //     .from("userChats")
  //     .select("friendId[]")
  //     .eq("id", currentUserID)
  //     .then((res) => {
  //       if (res.data[0].friendId) {
  //         return res.data[0].friendId;
  //       }
  //     })
  //     .then(async (data) => {
  //       data = data.filter((item) => item !== userID);
  //       await supabase
  //         .from("userChats")
  //         .update({ friendId: data })
  //         .eq("id", currentUserID);
  //     })
  //     .catch((err) => {
  //       console.log("friend list fetch error ", err);
  //     });
  // };
  // const chatDelete = async () => {
  //   await supabase
  //     .from("chats")
  //     .update({
  //       messages: [],
  //     })
  //     .eq("chat_id", chatData.chatId);
  // };
  const createChat = async () => {
    const chatId =
      session.user.id > user.id
        ? session.user.id + user.id
        : user.id + session.user.id;

    await createChatRoom(chatId, session.user.id, user.id);
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  const createChatRoom = async (chatID, senID, recID) => {
    await supabase
      .from("chats")
      .select("chat_id")
      .eq("chat_id", chatID)
      .then(async (res) => {
        if (res.status === 200) {
          return res;
        }
      });
    await supabase.from("chats").insert([
      {
        chat_id: chatID,
        user1: senID,
        user2: recID,
        messages: [
          {
            senderId: senID,
            message: "Chat started",
            send_at: new Date(),
          },
        ],
      },
    ]);
  };
  const openChat = async () => {
    await createChat();
  };

  return props.user_id ? (
    <div className="user--card center--flexed">
      <img src={user.avatar} alt="" />
      <div onClick={openChat} className="user--info">
        <h4>{user.username}</h4>
        <p>{lastMessage.message}</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default User;
