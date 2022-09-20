import React, { useContext, createContext, useReducer } from "react";
import { UserContext } from "./UserContext";
export const ChatContext = createContext();
const ChatContextProvider = ({ children }) => {
  const { session } = useContext(UserContext);

  const INITIAL_STATE = {
    chatId: null,
    user: {},
  };
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        const chatId =
          session.user.id > action.payload.id
            ? session.user.id + action.payload.id
            : action.payload.id + session.user.id;
        return {
          chatId: chatId,
          user: action.payload,
        };
      case "REMOVE_USER":
        return {
          chatId: null,
          user: {},
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
