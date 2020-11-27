import express = require('express');
import mongoose from 'mongoose';
const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/teste', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});