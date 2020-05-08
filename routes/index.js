const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', async (request, response) => { 
    const posts = await Post.find({});
    response.status(200).send(posts);
});

router.post('/', async (request, response) => {
    const postData = {
        title: request.body.title,
        content: request.body.content
    }
    const post = new Post(postData);
    await post.save();
    response.status(201).send(post);
});

router.put('/:id', async (request, response) => {
    const post = await Post.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).send(post);
})

router.delete('/:id', async (request, response) => {
    const post = await Post.findByIdAndRemove(request.params.id);
    response.status(200).send(post);
});

module.exports = router;