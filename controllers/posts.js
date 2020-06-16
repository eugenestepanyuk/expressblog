const { Router } = require('express');
const controller = Router();
const { authenticateMiddleware } = require('../middlewares/secure/authenticate');
const postSetvice = require('../services/postsService');

async function getPosts(request, response) {
    return response.json(await postSetvice.get(request.body));
}

async function postPost(request, response) {
    return response.json(await postSetvice.post(request.body));
}

async function putPost(request, response) {
    return response.json(await postSetvice.put(request.body));
}

async function removePost(request, response) {
    return response.json(await postSetvice.remove(request.body));
}

controller.get('/', authenticateMiddleware, getPosts);
controller.post('/', authenticateMiddleware, postPost);
controller.put('/:id', authenticateMiddleware, putPost)
controller.delete('/:id', authenticateMiddleware, removePost);

module.exports = {
    path: '/protected',
    instance: controller
};