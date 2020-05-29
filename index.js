const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const home = require('./routes/home');
const posts = require('./routes/posts');
const users = require('./routes/users');
const keys = require('./keys');
const config = require('config');

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, 'public');
const app = express();

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
mongoose.set('useCreateIndex', true);

app.use('/', home);
app.use(express.json());
app.use('/posts', express.static(clientPath));
app.use('/api/posts', posts);
app.use('/api/users', users);

app.listen(port, () => {
    console.log(`Server has been started on ${port} port..`);
});
