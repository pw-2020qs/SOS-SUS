export interface Hospital {
    id: Number;
    nome: String;
    cmes: String;
    endereco: String;
    estado: String;
    estadoSigla: String;
    municipio: String;
    dataNotificacao: String;
    ofertaRespiradores: number;
    ofertaHospCli: number;
    ofertaHospUti: number;
    ofertaSRAGCli: number;
    ofertaSRAGUti: number;
    ocupHospCli: number;
    ocupHospUti: number;
    ocupSRAGCli: number;
    ocupSRAGUti: number;
    altas: number;
    obitos: number;
    ocupacaoInformada: boolean;
    algumaOcupacaoInformada: boolean;
}

export const hospitalList: Hospital[] =
    [
        {
            id: 2084287,
            nome: "SANTA CASA DE MISERICORDIA DE ITAPIRA",
            cmes: "2084287",
            endereco: "Rua teste",
            estado: "São Paulo",
            estadoSigla: "SP",
            municipio: "Itapira",
            dataNotificacao: "2020-11-24T03:00:55.266Z",
            ofertaRespiradores: 0,
            ofertaHospCli: 44,
            ofertaHospUti: 10,
            ofertaSRAGCli: 0,
            ofertaSRAGUti: 0,
            ocupHospCli: 23,
            ocupHospUti: 6,
            ocupSRAGCli: 0,
            ocupSRAGUti: 0,
            altas: 0,
            obitos: 0,
            ocupacaoInformada: true,
            algumaOcupacaoInformada: true
        },
        {
            id: 2084287,
            nome: "Centro de Habilitação Respiratorio Noé Da Silva",
            cmes: "2084287",
            endereco: "Rua alpha 2",
            estado: "São Paulo",
            estadoSigla: "SP",
            municipio: "Itapira",
            dataNotificacao: "2020-11-24T03:00:55.266Z",
            ofertaRespiradores: 0,
            ofertaHospCli: 44,
            ofertaHospUti: 10,
            ofertaSRAGCli: 0,
            ofertaSRAGUti: 0,
            ocupHospCli: 23,
            ocupHospUti: 6,
            ocupSRAGCli: 0,
            ocupSRAGUti: 0,
            altas: 0,
            obitos: 0,
            ocupacaoInformada: true,
            algumaOcupacaoInformada: true
        }
    ]