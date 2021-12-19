const express = require('express');
const req = require('express/lib/request');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json()); empty object with Postman



//Import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute); //Middleware

//Routes
app.get('/', (req, res) => {
    res.send('Home page!');
});

//Listen to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
    console.log('connected to db!');
});

//Listen to server
app.listen(3000);