import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
});

socket.on("connection", () => {
    console.log("Connected to server:", socket.id);
})

export default socket;