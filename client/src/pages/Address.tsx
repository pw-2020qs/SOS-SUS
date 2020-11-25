import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MapComponent from '../components/MapComponent';
import AddressFormComponent from '../components/FormularioEnderecoComponent';
import BtnComponent from '../components/BtnComponent';
import smallLogo from '../images/logo_SOS_SUS_mini.png';

import '../styles/pages/Address.css'

const Address: React.FC = () => {
  return (
    <div id="page-map">
      <div id="main">
        <Sidebar>
          <div className="alignIconRight">
            <img className="iconFormat" id="small-logo" src={smallLogo} alt="small_logo" />
          </div>
          <AddressFormComponent/>
          <div className="gridBtn grid-template-area">
            <div className="btnLarge">
              <Link to='/map'>
                <BtnComponent>Procurar hospital</BtnComponent>
              </Link>
            </div>
            <div className="btnSmall">
              <Link to='/'>
                <BtnComponent><i className="fas fa-arrow-left"></i></BtnComponent>
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
      {/* <Footer /> */}
    </div>
  );
}

export default Address;