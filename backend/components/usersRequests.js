const Joi = require("joi");
const { Users } = require("../models/users");
const bcrypt = require("bcrypt");

const postUsersRequest = async (req, res) => {
  try {
    const prevUser = await Users.findOne({ email: req.body.email });
    if (prevUser) {
      return res.status(400).send("Email already registered");
    }

    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    return res.status(201).send("New User Account Created Successfully!");
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
};

module.exports.postUsersRequest = postUsersRequest;
