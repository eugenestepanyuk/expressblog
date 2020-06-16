require("./config/preload");
const express = require('express');
//const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const router = require('./router');
const ErrorCode = require('./middlewares/error');

//console.log(`[${process.env.NODE_ENV.toUpperCase()}]: Loaded configuration`, config);

//const clientPath = path.join(__dirname, 'public');
//const registerPath = path.join(__dirname, 'public/register.html');
const app = express();


if (!config.jwt.secret) {
    console.error(ErrorCode.FatalError);
    process.exit(1);
}

(async () => {
    try {
        await mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error(err));

        app.use(express.json());
        app.use(express.static(__dirname + '/public'));
        app.use('/api', router);
        app.all("*", (request, response) => response.json({ success: false, error: ErrorCode.NotFound }));
        //app.use('/reg', express.static(registerPath));
        //app.use('/posts', express.static(clientPath));
    } catch (error) {
        console.log(error.message);
    }
})();

app.listen(config.port, () => console.log(`Server has been started on ${config.port} port..`));
