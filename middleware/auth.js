const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (request, response, next) => {
  if (!request.headers.authorization) return response.status(401).send("Access denied. No token provided.");

  const [_, token] = request.headers.authorization.split(" ");
  if (!token) return response.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    request.user = decoded;
    return next();
  } catch (ex) {
    return response.status(400).send("Invalid token.");
  }
};
