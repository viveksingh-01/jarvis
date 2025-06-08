import { createContext } from "react";
import type IMessage from "../types/message";

const MessageContext = createContext<IMessage>({} as IMessage);

export default MessageContext;
