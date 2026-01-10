import { io } from "socket.io-client";

//dev
// const URL = "http://localhost:3000"; 

//railway deployment
const URL = 'kombio-backend-production.up.railway.app'

export const socket = io(URL, { autoConnect: false }); 
