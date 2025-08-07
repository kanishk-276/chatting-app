// socket.js

import { io } from "socket.io-client";

// Generate and persist a random user ID
let storedUserId = localStorage.getItem("userId");

if (!storedUserId) {
  storedUserId = crypto.randomUUID();  // ensures each tab gets a unique userId
  localStorage.setItem("userId", storedUserId);
}

export const userId = storedUserId;
export const socket = io("http://localhost:5000");
