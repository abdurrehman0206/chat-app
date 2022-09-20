import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
export const UserContext = createContext();
function UserContextProvider({ children }) {
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    website: "",
    avatar: "",
  });
  const [sessionError, setSessionError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [updating, setUpdating] = useState(false);
  useEffect(() => {
    const getSession = async () => {
      await supabase.auth
        .getSession()
        .then(({ data: { session } }) => setSession(session))
        .catch((error) => {
          setSessionError(error);
        });
      supabase.auth.onAuthStateChange((event, { session: newSession }) => {
        setSession(newSession);
      });
    };

    getSession();

    return () => {
      return getSession();
    };
  }, []);
  useEffect(() => {
    if (session) {
      const unsub = () => getProfile();
      unsub();
      return () => unsub();
    }
  }, [session, updating]);
  const initializeProfile = async () => {
    await supabase.from("profiles").insert([
      {
        id: session.user.id,
        updated_at: new Date(),
        avatar:
          "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image-300x300.jpeg",
      },
    ]);
    await supabase.from("userChats").insert([
      {
        id: session.user.id,
        friendId: [],
      },
    ]);
  };
  const getProfile = async () => {
    await supabase
      .from("profiles")
      .select("username , website , avatar ")
      .eq("id", session.user.id)
      .single()
      .then((res) => {
        if (res.status === 406) {
          initializeProfile();
          getProfile();
          return;
        } else {
          return res.data;
        }
      })
      .then((data) => {
        setCurrentUser(data);
        setFetch(true);
      })
      .catch((err) => {
        setFetchError(err);
      });
  };
  return (
    <UserContext.Provider
      value={{
        session,
        currentUser,
        fetch,
        sessionError,
        fetchError,
        setUpdating,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
