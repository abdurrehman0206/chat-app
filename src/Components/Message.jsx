import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { ChatContext } from "../context/ChatContext";
function Message(props) {
  const { session, currentUser } = useContext(UserContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  return (
    <div
      ref={ref}
      className={
        props.message.senderId === session.user.id
          ? "message--container center--flexed owner"
          : "message--container center--flexed"
      }
    >
      <img
        src={
          props.message.senderId === session.user.id
            ? currentUser.avatar
            : data.user.avatar
        }
        alt=""
      />
      <div className="message--content">
        <p>{props.message.message}</p>
      </div>
    </div>
  );
}

export default Message;
