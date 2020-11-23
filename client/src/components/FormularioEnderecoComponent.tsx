import React from 'react';

import '../styles/components/HospitalCardComponent.css'

const formularioEnderecoComponent = (props: {
  cep: String;
  rua: String;
  bairro: String;
  complemento: String;
  raioDeProcura: DoubleRange;
}) => {
  return (
    <form>
      <label>
        <p style="line-height: 16px;"><strong>CEP</strong></p>
        <br/>
        <input className="form" type="text" />
      </label>
    </form>
  )
};

export default formularioEnderecoComponent;