import React from 'react';

import '../styles/components/FormularioEnderecoComponent.css'

interface formsComponent {  
  cep?: string;
  onChange?: any;
  onSubmit?: any;
  onBlur?: any;
}

const AddressFormComponent = (props: formsComponent) => {
  return (
    <form onSubmit={props.onSubmit}>
      <label htmlFor="cep-input">CEP</label><br/>
      <input id="cep-input" type="text" onChange={props.onChange} value={props.cep} onBlur={props.onBlur}/>
    </form>
  )
};

export default AddressFormComponent;