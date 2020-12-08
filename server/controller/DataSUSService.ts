import { request } from 'http';
 
const requisicaoPost = request(
  {
    host: 'https://elastic-leitos.saude.gov.br/',
    port: '',
    path: '/leito_ocupacao/_search?size=150',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo='
    }
  },
  response => {
    console.log(response.statusCode); 
  }
);
 
requisicaoPost.write({
    "query": {
        "bool": {
            "must": [
                {
                    "match": {
                        "estadoSigla": "SP"
                    }
                },
                {
                    "match": {
                        "estado": "São Paulo"
                    }
                },
                {
                    "match": {
                        "dataNotificacaoOcupacao": "2020-11-24"
                    }
                }
            ]
        }
    }
});
 
requisicaoPost.end();

export default 