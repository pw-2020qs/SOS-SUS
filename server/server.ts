import express = require('express');
import { hospitalList } from './models/Hospital';
import mongoose = require('mongoose');
import request = require('request');
//const request = require('request');

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
    res.send(retornaListaCNES(["2077418", "2077531"]));
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

function retornaListaCNES(cnesList: String[]){
    const options = {
        url: 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search?size=150',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo='
        },
        json: true,
        body: {
                "query": {
                  "terms": {
                    "cnes": cnesList
                  }
                }
            }
      }

    const resposta = request.post(options, (err: any, res: { statusCode: any; }, body: string) => {
        if (err) {
            console.log(err);
        }
        console.log(JSON.stringify(body))
        return body;
    });

    return JSON.stringify(resposta);
}

