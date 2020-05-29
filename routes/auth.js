const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/', async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) return response.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(request.body.password, user.password);              
    if (!validPassword) return response.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();                                                              
    response.send(token);
});

module.exports = router;