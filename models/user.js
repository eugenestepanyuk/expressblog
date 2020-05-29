const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: Boolean,
});

const User = mongoose.model("users", userSchema);

userSchema.methods.generateAuthToken = function () {
  const { password, ...payload } = this;
  const token = jwt.sign(payload, config.get("jwtPrivateKey"));
  return token;
};

exports.User = User;
