export async function retornaListaEstado(estado: String){
    
    const url = 'https://elastic-leitos.saude.gov.br/leito_ocupacao/_search?size=10000'
    const bodyRequest = JSON.stringify({
      "query": {
          "bool": {
            "should": [
      
              { "match": { "estadoSigla": estado }}
      
            ]
          }
        }
    })
  
    const response = await fetch(url,{
        method: 'POST',
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
    })    
    return response.json();
  
  }

  export default retornaListaEstado;