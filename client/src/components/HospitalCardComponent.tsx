import React from 'react';

import '../styles/components/HospitalCardComponent.css'

const HospitalCardComponent = (props: {
  name: String;
  estado: String;
  rua: String;
  link1: String;
  link2: String;
}) => {
  return (
    <div className="card row container">
      <h2><b>{props.name}</b></h2>
      <h4><p>{props.estado}</p></h4>
      <h5>{props.rua}</h5>
      <div className="row card-links">
        <div className="column">
          <h6><a href="">{props.link1}</a></h6>
        </div>
        <div className="column marginLeft">
          <h6><a href="">{props.link2}</a></h6>
        </div>
      </div>
    </div>
  )
};

export default HospitalCardComponent;