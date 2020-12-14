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
  algumaOcupacaoInformada: boolean
  altas: number
  cnes: string
  dataNotificacaoOcupacao: string
  estado: string
  estadoSigla: string
  municipio: string
  nomeCnes: string
  obitos: number
  ocupHospCli: number
  ocupHospUti: number
  ocupSRAGCli: number
  ocupSRAGUti: number
  ocupacaoInformada: boolean
  ofertaHospCli: number
  ofertaHospUti: number
  ofertaRespiradores: number
  ofertaSRAGCli: number
  ofertaSRAGUti: number
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
      })
    }

  }, [])

  useEffect(() => {
    if (lat !== 0 && long !== 0) {
      const runAPI = async () => {
        const res = await api.get(`chamada?lat=${lat}&long=${long}`)
        console.log(`lat=${lat}&long=${long}`);
        if (res.data === []) {
          alert("Não conseguimos encontrar dados para sua cidade")
        }
        console.log(res.data)
        setHosps(res.data)
      }

      runAPI()

    }
  }, [lat, long])

  const [toggle, setToggle] = useState('open')

  const toggleMenu = (toggleStatus: string) => {
    if (toggleStatus === 'open') return 'close'
    return 'open'
  }

  const handleClick = () => {
    setToggle(toggleMenu(toggle))
  }

  const renderHosps = () => {
    if (hosps !== []) {
      hosps.map((hosp: hospital) => {
        return (
          <HospitalCardComponent
            key={hosp.cnes}
            name={hosp.nomeCnes}
            estado={hosp.estado}
            rua={hosp.municipio}
            latitude={lat}
            longitude={long}
            link1='Como chegar?'
            link2='Copiar endereço'
          />
        )
      })
    }
    return null;
  }

  const renderPlaceholders = () => {
    if (hosps !== []) {
      hosps.map((hosp: hospital) => {
        return (
          <Marker key={hosp.cnes} position={[lat, long]}>
            <Popup closeButton={true} minWidth={240} maxWidth={240} className="map-popup">
              {hosp.nomeCnes}
            </Popup>
          </Marker>
        )
      })
    }
    return null;
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
              renderHosps()
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
            renderPlaceholders()
          }
        </MapComponent>
      </div>
    </div>

  );
}

export default MapPage;
