const express = require("express");
const router = express.Router();
const { postLoginRequest } = require("../components/loginRequests");

router.post("/", postLoginRequest);

module.exports.loginRouter = router;
