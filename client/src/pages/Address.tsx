import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import Sidebar from '../components/Sidebar';
import MapComponent from '../components/MapComponent';

// import { Container } from './styles';

const Address: React.FC = () => {
  return (
    <div id="page-map">
      <div id="main">
        <Sidebar>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
          <input type="text"/>
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