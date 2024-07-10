import React from "react";
import { io } from "socket.io-client";
import { environmentUrls } from "../constants";

export const socket = io(environmentUrls.file_url, { transports: ["websocket"] });
export const SocketContext = React.createContext();
