import cors = require('cors');
import express = require('express');
import mongoose = require('mongoose');
global.fetch = require("node-fetch");
import scheduler = require('node-schedule');
import atualizaDadosEstado from './models/Scheduler'
import * as DataSusController from './controller/DataSusController';

global.fetch = require("node-fetch");
require('dotenv').config();

const app = express();

const uri: string = "mongodb://sossusadmin:rYHr9CR5pmLk!EP@dbh11.mlab.com:27117/sossus";

app.use(cors());

mongoose.connect(uri,{useNewUrlParser: true }, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connecting to MONGO`);
  }
});

app.get('/', DataSusController.healthCheck);

app.get('/chamada', DataSusController.getCensList);

app.get('/test', DataSusController.test);

app.listen(3333, function () {
  console.log('App is listening on port 3333!');
});

const listaEstados: string[] = ["SP","RJ","ES","BA","MG","PR","PA","RS"]

scheduler.scheduleJob('0 * * * *', function () {
  listaEstados.forEach(async function(estado) {
    await atualizaDadosEstado(estado);
  });
});
