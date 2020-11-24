import React from 'react';
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import HospitalCardComponent from '../components/HospitalCardComponent'
import Sidebar from '../components/Sidebar';
import smallLogo from '../images/logo_SOS_SUS_mini.png';

import '../styles/pages/MapPage.css'
import { Link } from 'react-router-dom';
import BtnComponent from '../components/BtnComponent';
// [-23.468226, -46.637794]
const MapPage: React.FC = () => {

  return (
    <div id="page-map">
      <div id="main">
        <Sidebar>
          <div>
            <img className="smallLogo" id="small-logo" src={smallLogo} alt="small_logo" />
          </div>
          <div className="cardsRow">
            <HospitalCardComponent
              name='Hospital Santa Terezinha'
              estado='São Paulo'
              rua='Avenida A - Bairro Y, numero 27'
              link1='Como chegar?'
              link2='Copiar endereço'
            />
            <HospitalCardComponent
              name='Hospital Bom Pastor'
              estado='São Paulo'
              rua='Avenida B - Bairro Z, numero 27'
              link1='Como chegar?'
              link2='Copiar endereço'
            />
            <HospitalCardComponent
              name='Hospital Trancoso Neto'
              estado='São Paulo'
              rua='Avenica C - Bairro Z, Numero 99'
              link1='Como chegar?'
              link2='Copiar endereço'
            />
          </div>
          <div className="row">
            <div className="column">
              <Link to='/map'>
                <BtnComponent>Inserir outro endereço</BtnComponent>
              </Link>
            </div>
            <div className="column">
              <Link to='/map'>
                <BtnComponent>Voltar</BtnComponent>
              </Link>
            </div>
          </div>
        </Sidebar>
        <MapComponent latitude={-23.468226} longitude={-46.637794} zoom={16}>
          <Marker key={"a123"} position={[-23.468226, -46.637794]}>
            <Popup closeButton={true} minWidth={240} maxWidth={240} className="map-popup">
              nome teste
          </Popup>
          </Marker>
        </MapComponent>
      </div>
    </div>
  );
}

export default MapPage;