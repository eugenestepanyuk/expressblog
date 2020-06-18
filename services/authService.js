const ErrorCode = require('../middlewares/error');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

async function login(payload) {
    try {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            return { success: false, error: ErrorCode.NotFound };
        }

        if (payload.password !== user.password) {
            return { success: false, error: ErrorCode.InvalidCredentials };
        }

        const token = user.generateAuthToken();
        if (!token) {
            return { success: false, error: ErrorCode.UnexpectedError };
        }

        return { success: true, content: token };
    } catch (error) {
        console.log(`[AuthService]: Login throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

async function register(payload) {
    try {
        const foundedUser = await User.findOne({ email: payload.email });
        if (foundedUser) {
            return { success: false, error: ErrorCode.AlreadyExist };
        }

        if (payload.password !== payload.confirmPassword) {
            return { success: false, error: ErrorCode.InvalidPayload };
        }

        const { confirmPassword, password, ...cleanedPayload } = payload;

        const user = await User.create({ ...cleanedPayload, password: bcrypt.hashSync(password, 10) });
        const token = user.generateAuthToken();
        if (!token) {
            return { success: false, error: ErrorCode.UnexpectedError };
        }

        return { success: true, content: token };
    } catch (error) {
        console.log(`[AuthService]: Register throw an error`, error.message);
        return { success: false, error: ErrorCode.UnexpectedError };
    }
}

module.exports = { login, register };