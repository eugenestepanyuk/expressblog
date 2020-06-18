const express = require('express');
const controller = express.Router();
const usersSetvice = require('../services/usersService');

// async function getUsers(request, response) {
//     return response.json(await usersSetvice.getUsers(request.body));
// }

async function getUser(request, response) {
    return response.json(await usersSetvice.getUser(request.body));
}

async function postUser(request, response) {
    return response.json(await usersSetvice.postUser(request.body));
}

//controller.get('/', getUsers);
controller.get('/', getUser);
controller.post('/', postUser);

module.exports = {
    path: '/users',
    instance: controller
};