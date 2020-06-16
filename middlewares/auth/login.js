const ErrorCode = require("../error");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,})+$/;

async function middleware(request, response, next) {
  if (!(await validate(request))) {
    return response.json({
      success: false,
      error: ErrorCode.InvalidPayload,
    });
  }

  return next();
}

async function validate(request) {
  if (!request.body) return false;
  if (!request.body.email || !request.body.email.trim()) return false;
  if (!request.body.password || !request.body.password.trim()) return false;
  if (!EMAIL_REGEX.test(request.body.email)) return false;

  return true;
}

module.exports = {
  loginMiddleware: middleware,
  validate
};