const express = require('express');
const router = express.Router();
const { Post } = require('../models/post');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

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
    const post = await Post.findById(request.params.id);

    if (post) {
        post.title = request.body.title || post.title;
        post.content = request.body.content || post.content;

        return response.json(await post.save());
    }

    return response.send(null);
})

router.delete('/:id', async (request, response) => {
    const post = await Post.findByIdAndRemove(request.params.id);
    response.status(200).send(post);
});

module.exports = router;