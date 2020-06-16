const ErrorCode = require('../middlewares/error');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

async function getUsers(request, response) {
    try {
        const users = await User.find({});
        if (!users) {
            return { success: false, error: ErrorCode.NotFound };
        }
        response.status(200).send(users);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function getUser(request, response) {
    try {
        const user = await User.findOne({ email: request.body.email });
        if (!user) {
            return { success: false, error: ErrorCode.NotFound };
        }
        response.status(200).send(user);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function postUser(request, response) {
    try {
        let user = await User.findOne({ email: request.body.email });
        if (user) {
            return { success: false, error: ErrorCode.AlreadyExist };
        }

        user = new User({
            email: request.body.email,
            password: request.body.password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = user.generateAuthToken();
        if (!token) {
            return { success: false, error: ErrorCode.UnexpectedError };
        }
        response.header('x-auth-token', token).send(user);
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

module.exports = { getUsers, getUser, postUser };