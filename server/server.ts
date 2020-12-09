import express = require('express');
import { hospitalList } from './models/Hospital';
import mongoose = require('mongoose');
global.fetch = require("node-fetch");
import retornaListaCNES from './controller/DataSUSService'


const app: express.Application = express();


const uri: string = "mongodb://sossusadmin:rYHr9CR5pmLk!EP@dbh11.mlab.com:27117/sossus";

mongoose.connect(uri, { useNewUrlParser: true }, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`Connecting to MONGO`);
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/teste2', async function (req, res) {
    res.send(await retornaListaCNES(["2077418", "2077531"]));
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

async function retornaListaCNESDecoy(cnesList: String[]) {
    const url = 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search?size=150'
    const bodyRequest = JSON.stringify({
        "query": {
            "terms": {
                "cnes": cnesList
            }
        }
    })

    const response = await fetch(url,{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo='
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: bodyRequest
    })    
    return response.json();
}

