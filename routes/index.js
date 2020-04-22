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
    const posts = await Post.find({_id: request.params.id});
    posts.title = request.body.title;
    posts.content = request.body.content;
    response.status(200).send(posts);
})

router.delete('/:id', async (request, response) => {
    await Post.remove({_id: request.params.id});
    response.status(200).send();
});

module.exports = router;