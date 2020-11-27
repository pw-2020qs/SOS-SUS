import { Schema  } from 'mongoose';
import mongoose from 'mongoose';

export const HospitaisModel = new Schema({
        id: { type: Number, required: true },
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

    const hospitais = mongoose.model("hospitais", HospitaisModel);
    export default hospitais;


