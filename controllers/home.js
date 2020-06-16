const { Router } = require('express');
const controller = Router();
const path = require('path');

const logintPath = path.normalize(path.join(__dirname, '..', 'public', 'login.html'));
const regPath = path.normalize(path.join(__dirname, '..', 'public', 'register.html'));

controller.get('/login', (request, response) => {
    response.sendFile(logintPath); 
});

controller.get('/register', (request, response) => {
    response.sendFile(regPath);
});

module.exports = {
    path: '/home',
    instance: controller
  };