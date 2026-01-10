import { io } from "socket.io-client";

//dev
// const URL = "http://localhost:3000"; 

//railway deployment
const URL = import.meta.env.VITE_BACKEND_URL

export const socket = io(URL, { autoConnect: false }); 
