import React, { useEffect, useContext, useState } from "react";
import { supabase } from "../supabaseClient";
import User from "./User";
import { UserContext } from "../context/UserContext";
import { FriendListContext } from "../context/FriendListContext";
import UserCardLoader from "./Loader/UserCardLoader";

function UserChats(props) {
  const { session } = useContext(UserContext);

  const { friendList, loading } = useContext(FriendListContext);

  // useEffect(() => {
  //   const unsub = () => getUserChats();
  //   unsub();
  //   return () => unsub();
  // }, [props.added]);
  // const friendChannel = supabase.channel("userChats");
  // friendChannel
  //   .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
  //     if (payload.new.id === session.user.id) {
  //       setFriendList(payload.new.friendId);
  //     }
  //   })
  //   .subscribe();

  // const getUserChats = async () => {
  //   setLoading(true);
  //   await supabase
  //     .from("userChats")
  //     .select("friendId[]")
  //     .eq("id", session.user.id)
  //     .then((res) => {
  //       if (res.data[0].friendId) {
  //         return res.data[0].friendId;
  //       }
  //     })
  //     .then((data) => {
  //       if (data) {
  //         setFriendList(data);
  //       }
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const userElements = friendList
    ? friendList.map((user, i) => {
        return <User key={i} user_id={user} />;
      })
    : null;

  return (
    <div className="friends--container">
      {loading ? <UserCardLoader /> : userElements}
    </div>
  );
}

export default UserChats;
