const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username } = req.body;
  
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ username });
    await user.save();
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
