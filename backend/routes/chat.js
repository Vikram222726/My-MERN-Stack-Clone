const express = require("express");
const router = express.Router();
const {
  postChatRequest,
  getChatRequest,
  updateChatRequest,
} = require("../components/chatRequests");

router.post("/", postChatRequest);
router.get("/", getChatRequest);
router.post("/:id", updateChatRequest);

module.exports.chatRouter = router;
