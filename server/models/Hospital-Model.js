"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitaisModel = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
exports.HospitaisModel = new mongoose_1.Schema({
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
var hospitais = mongoose_2.default.model("hospitais", exports.HospitaisModel);
exports.default = hospitais;
