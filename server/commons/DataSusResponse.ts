export type HospitalOccupancy = {
  estado: String
  estadoSigla: String
  municipio: String
  cnes: String
  nomeCnes: String
  dataNotificacaoOcupacao: String
  ofertaRespiradores: Number
  ofertaHospCli: Number
  ofertaHospUti: Number
  ofertaSRAGCli: Number
  ofertaSRAGUti: Number
  ocupHospCli: Number
  ocupHospUti: Number
  ocupSRAGCli: Number
  ocupSRAGUti: Number
  altas: Number
  obitos: Number
  ocupacaoInformada: Boolean
  algumaOcupacaoInformada: Boolean
  lat?: String
  long?: String
  formattedAddress?: String
}

export type HospitalUnit = {
  _index: String
  _type: String
  _id: String
  _score: Number
  _source: HospitalOccupancy
}

export type DataSusResponse = {
  took: Number
  timed_out: Boolean
  _shards: {
    total: Number
    successful: Number
    skipped: Number
    failed: Number
  }
  hits: {
    total: {
      value: Number
      relation: String
    }
    max_score: Number
    hits: HospitalUnit[] 
  }
}
