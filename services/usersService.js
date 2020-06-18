const ErrorCode = require('../middlewares/error');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

// async function getUsers() {
//     try {
//         const users = await User.find({});
//         if (!users) {
//             return { success: false, error: ErrorCode.NotFound };
//         }

//         const token = users.generateAuthToken();
//         if (!token) {
//             return { success: false, error: ErrorCode.UnexpectedError };
//         }

//         return { success: true, content: token };
//     } catch (error) {
//         console.log(`[AuthService]: Register throw an error`, error.message);
//         return { success: false, error: ErrorCode.UnexpectedError };
//     }
// }

async function getUser(payload) {
    try {
        const user = await User.findOne({ email: payload.email });
        if (!user) {
            return { success: false, error: ErrorCode.NotFound };
        }

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

async function postUser(payload) {
    try {
        let user = await User.findOne({ email: payload.email });
        if (user) {
            return { success: false, error: ErrorCode.AlreadyExist };
        }

        user = new User({
            email: payload.email,
            password: payload.password
        });

        //const salt = await bcrypt.genSalt(10);
        //user.password = await bcrypt.hash(payload.password, salt);
        //await user.save();

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

module.exports = { getUser, postUser };