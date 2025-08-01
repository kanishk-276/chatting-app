const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  const { sender, content } = req.body;

  try {
    const user = await User.findById(sender);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const message = new Message({
      sender: user._id,
      content,
    });

    await message.save();
    res.status(201).json({ message: "Message sent", message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
