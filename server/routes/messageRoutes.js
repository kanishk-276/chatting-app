import express from "express";
import Message from "../models/Message.js";

const router = express.Router();


router.post("/", async (req, res) => {
  const { senderId, text } = req.body;

  try {
    const message = new Message({ senderId, text });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Could not save message" });
  }
});


router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch messages" });
  }
});

export default router;
