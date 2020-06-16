const ErrorCode = require('../middlewares/error');
const { Post } = require('../models/post');

async function get(request, response) {
    try {
        const posts = await Post.find({});
        if (!posts) {
            return { success: false, error: ErrorCode.NotFound };
        }
        response.status(200).send(posts);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function post(request, response) {
    try {
        const postData = {
            title: request.body.title,
            content: request.body.content
        }
        const post = new Post(postData);
        await post.save();
        response.status(201).send(post);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function put(request, response) {
    try {
        const post = await Post.findById(request.params.id);

        if (post) {
            post.title = request.body.title || post.title;
            post.content = request.body.content || post.content;

            return response.json(await post.save());
        }

        return response.send(null);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function remove(request, response) {
    try {
        const post = await Post.findByIdAndRemove(request.params.id);
        if (!post) {
            return { success: false, error: ErrorCode.NotFound };
        }
        response.status(200).send(post);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

module.exports = { get, post, put, remove };