const { Router } = require('express');
const controller = Router();
const { loginMiddleware } = require('../middlewares/auth/login');
const { registerMiddleware } = require('../middlewares/auth/register');
const authService = require('../services/authService');

async function login(request, response) {
  return response.json(await authService.login(request.body));
}

async function register(request, response) {
  return response.json(await authService.register(request.body));
}

controller.post("/login", loginMiddleware, login);
controller.post("/register", registerMiddleware, register);

module.exports = {
  path: '/auth',
  instance: controller
};