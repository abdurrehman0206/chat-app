import React, { useState, useContext, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { UserContext } from "../context/UserContext";
import Loader from "../Components/Loader/Loader";
import addImage from "../images/add-avatar.png";

function Account() {
  const { session, currentUser, fetch, fetchError, sessionError, setUpdating } =
    useContext(UserContext);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  console.log(currentUser);
  // const { data, fetchError, fetch } = useGetProfile(updating);
  useEffect(() => {
    setUsername(currentUser.username);
    setWebsite(currentUser.website);
  }, [currentUser]);
  const updateProfile = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const website = e.target[1].value;
    const avatar = e.target[2].files[0];
    setUpdating(true);
    try {
      let url = "";
      let updates = {};
      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const newFile = `${session.user.id}`;
        const fileName = `${session.user.id}.${fileExt}`;
        const filePath = `${fileName}`;
        const { error: existError } = await supabase.storage
          .from("avatars")
          .remove(newFile);
        const { error: fileError } = await supabase.storage
          .from("avatars")
          .upload(newFile, avatar);
        const { data } = supabase.storage.from("avatars").getPublicUrl(newFile);
        url = data.publicUrl;
        updates = {
          id: session.user.id,
          username,
          website,
          avatar: url,
          updated_at: new Date(),
        };
        if (existError || fileError) {
          throw existError || fileError;
        }
      } else {
        updates = {
          id: session.user.id,
          username,
          website,
          avatar: currentUser.avatar,
          updated_at: new Date(),
        };
      }

      let { error: upsertError } = await supabase
        .from("profiles")
        .upsert(updates);
      if (upsertError) {
        throw upsertError;
      }
    } catch (error) {
      console.log("Session Error : ", sessionError);
      console.log("Fetch Error : ", fetchError);
      console.log("Exist Error : ", error.existError);
      console.log("File Error : ", error.fileError);
      console.log("Upsert Error : ", error.upsertError);
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="account--wrap center--flexed">
      {fetch ? (
        <div className="account--container ">
          <div className="account--details center--flexed">
            <img className="avatar" src={currentUser.avatar} alt="" />

            <h3>{currentUser.username}</h3>
            <h4>{session.user.email}</h4>
            <p>{currentUser.website}</p>
          </div>

          <form className="center--flexed" onSubmit={(e) => updateProfile(e)}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username || ""}
            />
            <input
              type="text"
              placeholder="Website"
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              value={website || ""}
            />
            <label htmlFor="avatar">
              <input style={{ display: "none" }} type="file" id="avatar" />
              <img style={{ width: "25px" }} src={addImage} alt="" />
              {"  "}Add Avatar
            </label>
            <button className="update--btn">Update</button>
          </form>
        </div>
      ) : (
        <div className="account--container center--flexed">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Account;
