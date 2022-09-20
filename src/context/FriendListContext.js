import React, { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "./UserContext";
export const FriendListContext = createContext();
const FriendListContextProvider = ({ children }) => {
  const { session } = useContext(UserContext);
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (session) {
      getFriendList();
      return () => getFriendList();
    }
  }, [session]);
  const friendChannel = supabase.channel("userChats");
  friendChannel
    .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
      if (payload.new.id === session.user.id) {
        setFriendList(payload.new.friendId);
      }
    })
    .subscribe();

  const getFriendList = async () => {
    setLoading(true);
    await supabase
      .from("userChats")
      .select("friendId[]")
      .eq("id", session.user.id)
      .then((res) => {
        if (res.data[0].friendId) {
          return res.data[0].friendId;
        }
      })
      .then((data) => {
        if (data) {
          setFriendList(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FriendListContext.Provider value={{ friendList, loading }}>
      {children}
    </FriendListContext.Provider>
  );
};

export default FriendListContextProvider;
