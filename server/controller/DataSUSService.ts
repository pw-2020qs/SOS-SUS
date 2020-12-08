const request = require('request');

let resposta: String;

class DataSusService {
    

    constructor(cnesList: String[]){

    }

    retornaListaCNES(cnesList: String[]){

    }

}


const options = {
    url: 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search?size=150',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo='
    },
    json: true,
    body: {}
  }

request.post(options, (err: any, res: { statusCode: any; }, body: String) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
    resposta = body;
});


