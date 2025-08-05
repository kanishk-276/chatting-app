require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");

const app = express();
const server = http.createServer(app);

// ✅ Update origin here to match Vite dev server
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

connectDB();

// ✅ Also set up CORS middleware with same origin
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("💬 Message received:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
