import { DataSusResponse } from "../commons/DataSusResponse";

const url = 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search?size=3747';

export async function getCnes(
  state: String,
  stateInitals: String,
  city: String
): Promise<DataSusResponse> {
  const bodyRequest = JSON.stringify(
    {
      "query": {
        "bool": {
          "should": [
            { "match": { "estado": state }},
            { "match": { "estadoSigla": stateInitals }},
            { "match": { "municipio": city }}
          ]
        }
      }
    }
  );
  
  console.log('Requested Address from Data SUS for:', state, stateInitals, city);

  const response = await fetch(
    url,
    {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic dXNlci1hcGktbGVpdG9zOmFRYkxMM1pTdGFUcjM4dGo='
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: bodyRequest
    }
  );    
  return response.json();
}
