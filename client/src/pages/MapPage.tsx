import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import MapComponent from '../components/MapComponent';
import HospitalCardComponent from '../components/HospitalCardComponent'
import Sidebar from '../components/Sidebar';
import smallLogo from '../images/logo_SOS_SUS_mini.png';
import '../styles/pages/MapPage.css'
import { Link, useHistory } from 'react-router-dom';
import BtnComponent from '../components/BtnComponent';
import api from '../services/api';

interface hospital {
  nome: string,
  endereco: string,
  estado: string,
  lat: number,
  long: number,
  CMES: string
}

const MapPage: React.FC = () => {
  const [hosps, setHosps] = useState([])
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const history = useHistory()
  const queryParams = new URLSearchParams(window.location.search)

  useEffect(() => {
    if (queryParams.has("lat") && queryParams.has("long")) {
      setLat(Number(queryParams.get("lat")))
      setLong(Number(queryParams.get("long")))
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
        console.log(`lat: ${lat} long: ${long}`)
      })
    }
  }, [])

  useEffect(() => {
    api.get(`chamada?lat=${lat}&long=${long}`).then(res => {
      if (res.data === []) {
        alert("Não conseguimos encontrar dados para sua cidade")
      }
      setHosps(res.data)
    })
  }, [lat, long])

  const [toggle, setToggle] = useState('open')

  const toggleMenu = (toggleStatus: string) => {
    if (toggleStatus === 'open') return 'close'
    return 'open'
  }

  const handleClick = () => {
    setToggle(toggleMenu(toggle))
  }

  return (
    <div id="page-map">
      <div id="main">
        <Sidebar toggle={toggle}>
          <div className="alignIconRight">
            <img className="iconFormat" id="small-logo" src={smallLogo} alt="small_logo" />
          </div>
          <div className="cards">
            {
              hosps.map((hosp: hospital) => {
                return (
                  <HospitalCardComponent
                    key={hosp.CMES}
                    name={hosp.nome}
                    estado={hosp.estado}
                    rua={hosp.endereco}
                    latitude={hosp.lat}
                    longitude={hosp.long}
                    link1='Como chegar?'
                    link2='Copiar endereço'
                  />
                )
              })
            }
          </div>
          <div className="gridBotao">
            <div className="botaoGrande">
              <Link to='/address'>
                <BtnComponent>Inserir outro endereço</BtnComponent>
              </Link>
            </div>
            <div className="botaoMenor">
              <BtnComponent onClick={history.goBack}><i className="fas fa-arrow-left"></i></BtnComponent>
              <BtnComponent onClick={handleClick}><i className="fas fa-bars"></i></BtnComponent>
            </div>
          </div>
        </Sidebar>
        <MapComponent latitude={lat} longitude={long} zoom={16}>
          <Marker key={"a123"} position={[lat, long]}>
            <Popup closeButton={true} minWidth={240} maxWidth={240} className="map-popup">
              Você está aqui
            </Popup>
          </Marker>
          {
            hosps.map((hosp: hospital) => {
              return (
                <Marker key={hosp.CMES} position={[hosp.lat, hosp.long]}>
                  <Popup closeButton={true} minWidth={240} maxWidth={240} className="map-popup">
                    {hosp.nome}
                  </Popup>
                </Marker>
              )
            })
          }
        </MapComponent>
      </div>
    </div>

  );
}

export default MapPage;
