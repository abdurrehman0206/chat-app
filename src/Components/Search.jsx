import React, { useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import SearchIcon from "../images/search.png";
import { UserContext } from "../context/UserContext";

function Search(props) {
  const { session } = useContext(UserContext);
  const [search, setSearch] = useState(null);
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    setUser(null);
    e.preventDefault();
    await supabase
      .from("profiles")
      .select("id, username , website , avatar ")
      .ilike("username", search)
      .single()
      .then((res) => {
        if (res.error) {
          throw res.error;
        } else {
          return res.data;
        }
      })
      .then((data) => setUser(data))
      .catch((err) => {
        if (err.code === "PGRST116") {
          console.log("No user found");
        }
      });
  };
  const addToFriends = async () => {
    if (user.id !== session.user.id) {
      await friendListUpdate(user.id, session.user.id);
      await friendListUpdate(session.user.id, user.id);
      props.added();
    } else if (user.id === session.user.id) {
      console.log("You can't add yourself as a friend");
    }
    setSearch(null);
    setUser(null);
  };
  const friendListUpdate = async (userID, currentUserID) => {
    await supabase
      .from("userChats")
      .select("friendId[]")
      .eq("id", currentUserID)
      .then((res) => {
        if (res.data[0].friendId) {
          return res.data[0].friendId;
        }
      })
      .then(async (data) => {
        data.push(userID);
        data = [...new Set(data)];
        await supabase
          .from("userChats")
          .update({ friendId: data })
          .eq("id", currentUserID);
      })
      .catch((err) => {
        console.log("friend list fetch error ", err);
      });
  };
  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <div className="search--area center--flexed">
        <input
          className="user--search"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search || ""}
        />

        <button>
          <img src={SearchIcon} alt="Search" />
        </button>
      </div>
      {user && (
        <div onClick={addToFriends} className="user--card center--flexed">
          <img src={user.avatar} alt="user" />
          <div className="user--info">
            <h4>{user.username}</h4>
          </div>
        </div>
      )}
    </form>
  );
}

export default Search;
