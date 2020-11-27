"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Hospital_1 = require("./models/Hospital");
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/teste', function (req, res) {
    if (req.query.cep == "123") {
        res.send("Erro");
    }
    res.send(Hospital_1.hospitais);
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
