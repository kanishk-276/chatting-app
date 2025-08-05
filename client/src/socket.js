import { io } from "socket.io-client";

export const socket = io("http://localhost:5000");


const storedUserId = localStorage.getItem("userId");
if (!storedUserId) {
  const newId = crypto.randomUUID();
  localStorage.setItem("userId", newId);
}

export const userId = localStorage.getItem("userId");

