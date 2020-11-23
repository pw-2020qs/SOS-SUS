import React from 'react';
import { Map, Marker, TileLayer, Popup} from 'react-leaflet'
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import Sidebar from '../components/Sidebar';

import '../styles/pages/MapPage.css'
// [-23.468226, -46.637794]
const MapPage: React.FC = () => {

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

export default MapPage;