import { type ReactNode, useState } from "react";
import type IMessage from "../types/message";
import MessageContext from "./MessageContext";

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages] = useState<IMessage>({
    greetings: {
      morning: ["A very good morning Sir!", "Morning Sir!", "Good morning Sir!"],
      noon: ["A very good afternoon Sir!", "Afternoon Sir!", "Good afternoon Sir!"],
      evening: ["A very good evening Sir!", "Very good evening Sir!", "Good evening Sir!"],
    },
  });

  return <MessageContext.Provider value={messages}>{children}</MessageContext.Provider>;
};

export default MessageProvider;
