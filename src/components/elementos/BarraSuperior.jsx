import React from 'react';
import DropdownMenu from './DropdownMenu';
import iconoBlanco from '../../assets/icono-foragend-blanco.png';

import "../../styles/BarraSuperior.css";

function BarraSuperior() {

    return (
        <div className="barra-superior">
          <div className="bS-logo-container">
            <img src={iconoBlanco} alt="Logo" className="bS-logo" />
          </div>
          <p className="pagina-titulo">FORAGEND</p>
          <DropdownMenu />
        </div>
    )
}

export default BarraSuperior;
