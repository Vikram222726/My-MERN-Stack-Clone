const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const Users = mongoose.model("usersAccount", userSchema);

module.exports.Users = Users;
