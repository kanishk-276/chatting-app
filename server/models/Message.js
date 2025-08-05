const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    
    senderId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  },
  { timestamps: true },
  
);

module.exports = mongoose.model("Message", messageSchema);
