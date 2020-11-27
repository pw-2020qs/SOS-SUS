"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Hospital_1 = require("./models/Hospital");
var mongoose_1 = __importDefault(require("mongoose"));
var app = express();
var uri = "mongodb://sossusadmin:rYHr9CR5pmLk!EP@dbh11.mlab.com:27117/sossus";
mongoose_1.default.connect(uri, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err.message);
    }
    else {
        console.log("Connecting to MONGO");
    }
});
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/teste', function (req, res) {
    if (req.query.cep == "123") {
        res.send("Erro");
    }
    res.send(Hospital_1.hospitalList);
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
