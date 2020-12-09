import mongoose = require('mongoose');
import { Hospital } from '../models/Hospital';

const HospitalSchema = new mongoose.Schema({     
    id: Number,
    nome: String,
    cmes: String,
    endereco: String,
    estado: String,
    estadoSigla: String,
    municipio: String,
    dataNotificacao: String,
    ofertaRespiradores: Number,
    ofertaHospCli: Number,
    ofertaHospUti: Number,
    ofertaSRAGCli: Number,
    ofertaSRAGUti: Number,
    ocupHospCli: Number,
    ocupHospUti: Number,
    ocupSRAGCli: Number,
    ocupSRAGUti: Number,
    altas: Number,
    obitos: Number,
    ocupacaoInformada: Boolean,
    algumaOcupacaoInformada: Boolean
 });

export interface CacheSchema{
    idLocalizacao: String,
    hospitalData: [Hospital]
}

const cacheSchema = new mongoose.Schema({
    idLocalizacao: String,
    hospitalData: [HospitalSchema]
});

const cacheModel = mongoose.model('cache',cacheSchema)

module.exports = cacheModel;
