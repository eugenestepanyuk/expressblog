const { Router } = require('express');
const router = Router();
const auth = require('./controllers/auth');
const home = require('./controllers/home');
const posts = require('./controllers/posts');
const users = require('./controllers/users');

for(const controller of [auth, home, posts, users]) {
    router.use(controller.path, controller.instance);
}

module.exports = router;