const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  channelIconId: Number,
  messageData: [
    {
      message: String,
      name: String,
      timeStamp: String,
      messageType: String,
    },
  ],
});

const Chat = mongoose.model("chatdata", chatSchema);

module.exports.Chat = Chat;
