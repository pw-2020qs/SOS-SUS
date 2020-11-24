import React, { ReactNode } from 'react';
import { Map, TileLayer } from 'react-leaflet';

// import { Container } from './styles';

interface MapProps {
  latitude: number,
  longitude: number,
  zoom: number,
  children?: ReactNode
}

const MapComponent: React.FC<MapProps> = (props: MapProps) => {
  let { latitude, longitude, zoom } = props;

  return (
    <Map
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {props.children}
    </Map>
  );
}

export default MapComponent;