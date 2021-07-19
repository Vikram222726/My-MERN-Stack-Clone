const Joi = require("joi");
const { Chat } = require("../models/chat");
const postChatRequest = async (req, res) => {
  try {
    const isAlreadyPresentChannel = await Chat.findOne({
      channelName: req.body.channelName,
    });
    if (isAlreadyPresentChannel) {
      return res.status(400).send("Channel with this name already Exits!");
    }

    const newchatChannel = new Chat({
      channelName: req.body.channelName,
      channelIconId: req.body.channelIconId,
      messageData: [],
    });

    const result = await newchatChannel.save();
    return res.status(201).send(newchatChannel);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

const getChatRequest = async (req, res) => {
  try {
    const allMessages = await Chat.find();
    res.status(200).send(allMessages);
  } catch (ex) {
    return status(500).send(ex.message);
  }
};

const updateChatRequest = async (req, res) => {
  try {
    const isChannelPresent = await Chat.findOne({
      channelName: req.body.channelName,
    });
    if (!isChannelPresent) {
      return res.status(404).send("Channel Not Found!");
    }

    const newMessage = {
      message: req.body.message,
      name: req.body.name,
      timeStamp: req.body.timeStamp,
      messageType: req.body.messageType,
    };

    isChannelPresent.messageData.push(newMessage);
    await isChannelPresent.save();
    res.send("Success");
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

module.exports.postChatRequest = postChatRequest;
module.exports.getChatRequest = getChatRequest;
module.exports.updateChatRequest = updateChatRequest;
