import { io } from "socket.io-client";

export const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const socket = io(URL, { autoConnect: false });
