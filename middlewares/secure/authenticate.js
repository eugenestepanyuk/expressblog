const jwt = require('jsonwebtoken');
const config = require('../../config');
const ErrorCode = require('../error');
const { User } = require('../../models/user');

async function middleware(request, response, next) {
  if (!(await validate(request))) {
    return response.json({
      success: false,
      error: ErrorCode.InvalidPayload,
    });
  }

  return next();
}

async function validate(request, response) {
  request.user = await resolveUser(request);
  if (!request.user) return response.status(404).send(ErrorCode.NotFound);

  return true;
}

async function resolveUser(request, response) {
  try {
    if (!request.headers.authorization) return response.status(401).send(ErrorCode.AccessDenied);

    const [_, token] = request.headers.authorization.split(' ');
    if (!token) return response.status(401).send(ErrorCode.AccessDenied);

    const decoded = jwt.verify(token, config.jwt.secret);
    if (!decoded) return response.status(401).send(ErrorCode.AccessDenied);

    const decodedUser = jwt.decode(token);
    if (!decodedUser) return response.status(401).send(ErrorCode.AccessDenied);

    return await User.findOne(decodedUser.email);
  } catch (ex) {
    return response.status(400).send(ErrorCode.InvalidPayload);
  }
}

module.exports = {
  authenticateMiddleware: middleware,
  validate
};