import express = require('express');
import { hospitais } from './models/Hospital';


const app: express.Application = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/teste', function (req, res) {
    if(req.query.cep == "123"){
        res.send("Erro")
    }
    res.send(hospitais);
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
