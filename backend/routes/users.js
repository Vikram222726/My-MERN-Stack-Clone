const express = require("express");
const router = express.Router();
const { postUsersRequest } = require("../components/usersRequests");

router.post("/", postUsersRequest);

module.exports.usersRouter = router;
