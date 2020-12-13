import scheduler = require('node-schedule');
import { DataSusResponse, HospitalUnit } from '../commons/DataSusResponse'
import retornaListaEstado from '../controller/DataSUSServiceState'
import mongoose = require('mongoose');


const HospitalOccupancy = new mongoose.Schema({
    estado: String,
    estadoSigla: String,
    municipio: String,
    cnes: String,
    nomeCnes: String,
    dataNotificacaoOcupacao: String,
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
    algumaOcupacaoInformada: Boolean,
    lat: String,
    long: String,
    formattedAddress: String
  })

const HospitalSchema = new mongoose.Schema({     
    _index: String,
    _type: String,
    _id: String,
    _score: Number,
    _source: HospitalOccupancy
 });

interface Estados {
    nome: String;
}

export const listaEstados: Estados[] = [
    {
        nome: "SP"
    },
    {
        nome: "RJ"
    },
    {
        nome: "ES"
    }
]


export default async function atualizaDadosEstado(estado: String){

    let estadosObject: DataSusResponse  = await retornaListaEstado(estado) as DataSusResponse;
    let hospitaisLista: HospitalUnit[] = estadosObject.hits.hits
    let collectionName: string = 'cnes_'+estado

    const hospitalModel = mongoose.model(collectionName,HospitalSchema)

    await dropCollection(hospitalModel)

    hospitaisLista.forEach(await async function(hospital){  
        let payload = await new hospitalModel(hospital)
        payload.save();
    })

}

async function dropCollection(hospitalModel: mongoose.Model<mongoose.Document, {}>){
    hospitalModel
    .collection
    .drop()
}






