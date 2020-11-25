import React from 'react';

import '../styles/components/FormularioEnderecoComponent.css'

const AddressFormComponent = (props: {
  cep?: String;
}) => {
  return (
    <form>
      <label htmlFor="cep-input">CEP</label><br/>
      <input id="cep-input" type="text" />
    </form>
  )
};

export default AddressFormComponent;