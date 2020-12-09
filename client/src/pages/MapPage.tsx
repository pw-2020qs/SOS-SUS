import React, { useEffect, useState } from 'react';
import { Marker, Popup} from 'react-leaflet'
import MapComponent from '../components/MapComponent';
import HospitalCardComponent from '../components/HospitalCardComponent'
import Sidebar from '../components/Sidebar';
import smallLogo from '../images/logo_SOS_SUS_mini.png';
import '../styles/pages/MapPage.css'
import { Link } from 'react-router-dom';
import BtnComponent from '../components/BtnComponent';

const MapPage: React.FC = () => {
  useEffect(() => {

  }, [])

  const [toggle, setToggle] = useState('open')

  const toggleMenu = (toggleStatus: string) => {
    if (toggleStatus === 'open') return 'close'
    return 'open'
  }
  
  const handleClick = () => {
    setToggle(toggleMenu(toggle))
  }

  const hospitals = () => {
    
  }

  return (
    <div id="page-map">
      <div id="main">
        <Sidebar toggle={ toggle }>
          <div className="alignIconRight">
            <img className="iconFormat" id="small-logo" src={smallLogo} alt="small_logo" />
          </div>
          <div className="cards">
            
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
            <HospitalCardComponent
              name='Hospital Trancoso Neto'
              estado='São Paulo'
              rua='Avenica C - Bairro Z, Numero 99'
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
          <div className="gridBotao">
            <div className="botaoGrande">
              <Link to='/address'>
                <BtnComponent>Inserir outro endereço</BtnComponent>
              </Link>
            </div>
            <div className="botarMenor">
              <Link to='/'>
                <BtnComponent><i className="fas fa-arrow-left"></i></BtnComponent>
              </Link>
              <Link to='/map'>
                <BtnComponent onClick={handleClick}><i className="fas fa-bars"></i></BtnComponent>
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
