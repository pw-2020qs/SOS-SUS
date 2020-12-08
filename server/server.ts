import express = require('express');
import { hospitalList } from './models/Hospital';
import mongoose from 'mongoose';
import * from './controller/DataSUSService';


const app: express.Application = express();


const uri: string = "mongodb://sossusadmin:rYHr9CR5pmLk!EP@dbh11.mlab.com:27117/sossus";
mongoose.connect(uri,{useNewUrlParser: true }, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`Connecting to MONGO`);
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/teste2', function (req, res) {
    res.send();
});

app.get('/teste', function (req, res) {
    if (req.query.cep == "123") {
        res.send("Erro")
    }
    res.send(hospitalList);
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
