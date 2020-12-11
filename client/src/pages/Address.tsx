import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MapComponent from '../components/MapComponent';
import AddressFormComponent from '../components/FormularioEnderecoComponent';
import BtnComponent from '../components/BtnComponent';
import smallLogo from '../images/logo_SOS_SUS_mini.png';

import '../styles/pages/Address.css'
import { google } from '../services/api';

interface CEPResponse {
  geometry: {
    location: {
      lat: number;
      lng: number
    }
  };

}

const Address: React.FC = () => {
  const [lat, setLat] = useState(-23.533773)
  const [long, setLong] = useState(-46.625290)

  const [redirect, setRedirect] = useState(false)

  const [CEP, setCEP] = useState("")
  const history = useHistory()

  useEffect(() => {
    if (lat !== 0 && long !== 0 && redirect) {
      history.push(`/map?lat=${lat}&long=${long}`)
    }
  }, [redirect])

  const getLatLong = React.useCallback(async () => {
    // Resposta do Axios
    const res = await google(CEP)
    
    // Atributo "data" que vem do axios (contém a resposta pura da API)
    const data = res.data

    // Campo results da API traz infos necessarias
    const results: Array<CEPResponse> = data.results
    if(results.length > 0) {
      return results[0].geometry.location;
    }

    return { lat: 0, lng: 0 }
  }, [CEP])

  const onBlur = async () => {
    const { lat: latitude, lng: longitude } = await getLatLong();

    setLat(latitude)
    setLong(longitude)
  }

  const clickBtn = async () => {
    setRedirect(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCEP(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div id="page-map">
      <div id="main">
        <Sidebar>
          <div className="alignIconRight">
            <img className="iconFormat" id="small-logo" src={smallLogo} alt="small_logo" />
          </div>

          <AddressFormComponent onChange={handleChange} onSubmit={clickBtn} onBlur={onBlur} />

          <div className="gridBtn grid-template-area">
            <div className="btnLarge">
              <BtnComponent onClick={clickBtn}>Procurar hospital</BtnComponent>
            </div>

            <div className="btnSmall">
              <BtnComponent onClick={history.goBack}><i className="fas fa-arrow-left"></i></BtnComponent>
            </div>
          </div>
        </Sidebar>
        <MapComponent latitude={lat} longitude={long} zoom={12}>
          <Marker key={"a123"} position={[lat, long]}>
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