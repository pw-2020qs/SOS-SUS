import express = require('express');
import { hospitalList } from './models/Hospital';
import mongoose = require('mongoose');
global.fetch = require("node-fetch");
import retornaListaCNES from './controller/DataSUSService'
import cors = require('cors');
<<<<<<< HEAD
import { CacheSchema } from './controller/Cache'
const cacheModel = require('./controller/Cache')

=======
>>>>>>> 2b2eb73... CEP to coords and map recenter

const app = express();

const uri: string = "mongodb://sossusadmin:rYHr9CR5pmLk!EP@dbh11.mlab.com:27117/sossus";

app.use(cors())

mongoose.connect(uri,{useNewUrlParser: true }, (err: any) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(`Connecting to MONGO`);
    }
});

app.get('/chamada', (req, res) => {
    console.log(`lat: ${req.query.lat} long: ${req.query.long}`)
    res.send(hospitalList)
})

app.get('/testeBancoConsulta', async (req, res) => {
        const resultado = await cacheModel.find({idLocalizacao: req.query.id})

    try{
        res.send(resultado)
    } catch (err) {
        res.status(500).send(err);
    }    
})

app.get('/testeBancoGrava', async (req, res) => {
    const payloadGrava = new cacheModel({idLocalizacao: req.query.id, hospitalData: hospitalList})

    try{
        await payloadGrava.save();
        res.send(payloadGrava);
    } catch (err) {
        res.status(500).send(err);
    }    
})

app.get('/', function (req, res: any) {
    res.send('Hello World!');
});

app.get('/teste2', async function (req, res) {
    res.send(await retornaListaCNES(["2077418", "2077531"]));
});

app.get('/teste', function (req, res) {
    if (req.query.cep == "123") {
        res.send("Erro")
    }
    console.log(hospitalList)
    res.send(hospitalList);
});

app.listen(3333, function () {
    console.log('App is listening on port 3333!');
});

