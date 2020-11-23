import React from 'react';

import '../styles/components/HospitalCardComponent.css'

const hospitalCardComponent = (props: {
  click: String;
  estado: String;
  rua: React.ReactNode;
  link1: React.ReactNode;
}) => {
  return (
    <div className="card">
      <div className="container">
        <h4><b>{props.click}</b></h4>
        <p>{props.estado}</p>
        <p>{props.rua}</p>
        <div className="row rightLink">
          <div className="column">
            <p>{props.link1}</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default hospitalCardComponent;