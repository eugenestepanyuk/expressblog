const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const postRouter = require('./routes/index');
const keys = require('./keys');

const port = process.env.PORT || 3000;
const clientPath = path.join(__dirname, 'public');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use(express.json());
app.use(express.static(clientPath));
app.use('/api/posts', postRouter);

app.listen(port, () => {
    console.log(`Server has been started on ${port} port..`);
});
