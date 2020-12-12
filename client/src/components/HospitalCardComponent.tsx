import React from 'react';

import '../styles/components/HospitalCardComponent.css'

interface hospCard {
  name: String;
  estado: String;
  rua: String;
  latitude: number;
  longitude: number;
  link1: String;
  link2: String;
}

const HospitalCardComponent = (props: hospCard) => {

  const deg_to_dms = (deg: number[]) => {

    let d1 = Math.floor(deg[0]);
    let minfloat1 = (deg[0] - d1) * 60;
    let m1 = Math.floor(minfloat1);
    let secfloat1 = (minfloat1 - m1) * 60;
    let s1 = Math.round(secfloat1);
    let NS = "S"
    deg[0] < 0 ? NS = "S" : NS = "N"

    if (s1 === 60) {
      m1++;
      s1 = 0;
    }
    if (m1 === 60) {
      d1++;
      m1 = 0;
    }
    let coord1 = `${d1}°${m1}'${s1}"${NS}`

    let d2 = Math.floor(deg[1]);
    let minfloat2 = (deg[1] - d2) * 60;
    let m2 = Math.floor(minfloat2);
    let secfloat2 = (minfloat2 - m2) * 60;
    let s2 = Math.round(secfloat2);
    let EW = "W"
    deg[0] < 0 ? EW = "W" : EW = "E"

    if (s2 === 60) {
      m2++;
      s2 = 0;
    }
    if (m2 === 60) {
      d2++;
      m2 = 0;
    }

    let coord2 = `${d2}°${m2}'${s2}"${EW}`

    return { coord1, coord2 };
  }

  const { coord1, coord2 } = deg_to_dms([props.latitude, props.longitude])

  return (
    <div className="card row container">
      <h2>{props.name}</h2>
      <h4><p>{props.estado}</p></h4>
      <h5>{props.rua}</h5>
      <div className="row card-links">
        <div className="column">
          <h6><a href={`https://www.google.com/maps/place/${coord1}+${coord2}`}>{props.link1}</a></h6>
        </div>
        <div className="column marginLeft">
          <h6><a href="/map">{props.link2}</a></h6>
        </div>
      </div>
    </div>
  )
};

export default HospitalCardComponent;