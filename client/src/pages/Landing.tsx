import React from 'react';
import Sidebar from '../components/Sidebar';
import BtnComponent from '../components/BtnComponent';
import { Link } from 'react-router-dom'

import bigLogo from '../images/Logo_SOS_SUS.png';
import sosSusIcon from '../images/sossus.svg';

import '../styles/pages/Landing.css'
import Footer from '../components/Footer';

const Landing: React.FC = () => {
  return (
    <div className="page-landing">
      <div className="main">
        <Sidebar>
          <div id="menu">
            <img id="big-logo" src={bigLogo} alt="big_logo" />
            <p id="slogan-paragraph">Preserve a vida. Se puder, fique em casa.</p>
            <div className="btn-container">
              <Link to='/map'>
                <BtnComponent>Procurar um hospital próximo a mim</BtnComponent>
              </Link>
              <Link to='/address'>
                <BtnComponent>Inserir endereço manualmente</BtnComponent>
              </Link>
            </div>
          </div>
        </Sidebar>
        <div className="landing-icons">
          <img src={sosSusIcon} alt="icon" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;