const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/me', auth, async (request, response) => {
    const user = await User.findById(request.user.id).select('-password');
    response.send(user);
});

router.post('/', async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (user) return response.status(400).send('User already registered');

    user = new User({
        email: request.body.email,
        password: request.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken(); 
    response.header('x-auth-token', token).send(user);
});

module.exports = router;