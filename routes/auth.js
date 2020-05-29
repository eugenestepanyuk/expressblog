const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/;

router.post("/", async (request, response) => {
  if (!_validatePayload(request.body)) return response.status(400).send("Invalid email or password");

  let user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(request.body.password, user.password);
  if (!validPassword) return response.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  response.send(token);
});

function _validatePayload(payload) {
  if (!payload.email.trim() || !payload.password.trim()) return false;
  if (!EMAIL_REGEX.test(payload.email)) return false;

  return true;
}

module.exports = router;