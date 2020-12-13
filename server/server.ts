import cors = require('cors');
import express = require('express');
import mongoose = require('mongoose');
global.fetch = require("node-fetch");
import { hospitalList } from './constants/hospitalList';
import retornaListaCNES from './controller/DataSUSService'
const cacheModel = require('./controller/Cache')
import scheduler = require('node-schedule');
import atualizaDadosEstado from './controller/Scheduler'

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

const listaEstados: string[] = ["SP","RJ","ES","BA","MG","PR","PA","RS"]

scheduler.scheduleJob('0 * * * *', async function () {
  listaEstados.forEach(await async function(estados){
    await atualizaDadosEstado(estados);
  })
  
})


