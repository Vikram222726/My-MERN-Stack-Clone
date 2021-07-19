const Joi = require("joi");
const { Users } = require("../models/users");
const bcrypt = require("bcrypt");

const postLoginRequest = async (req, res) => {
  try {
    const prevUser = await Users.findOne({ email: req.body.email });
    if (!prevUser) {
      return res.status(400).send("Invalid Email Id!");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      prevUser.password
    );
    if (!isValidPassword) {
      return res.status(400).send("Invalid Email or Password!");
    }

    let oldUser = new Users({
      username: prevUser.username,
      email: prevUser.email,
    });

    const token = oldUser.generateAuthToken();

    return res.header("x-auth-token", token).send(token);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

module.exports.postLoginRequest = postLoginRequest;
