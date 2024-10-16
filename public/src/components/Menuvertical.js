import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/menuvertical.css'; // Archivo CSS para estilos personalizados
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faClipboardList, faStore, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from './DropdownMenu'; // Importa el componente DropdownMenu

function MenuVertical() {
  return (
    <div className="menu-vertical">
      <div className="menu-header">
        <p>ForAgend</p>
      </div>
      <div className='menu-user'>
        <DropdownMenu /> {/* Componente DropdownMenu */}
      </div>
      
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/agendar">
              <FontAwesomeIcon icon={faCalendarAlt} /> Agendar Cita
            </Link>
          </li>
          <li>
            <Link to="/reporte-citas">
              <FontAwesomeIcon icon={faClipboardList} /> Reporte Citas
            </Link>
          </li>
          <li>
            <Link to="/comercios-aliados">
              <FontAwesomeIcon icon={faStore} /> Comercios Aliados
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
      <div className='footer'>
        <p>© ForAgend Colombia V2.0.23.76 2024</p>
      </div>
    </div>

    
  );
}

export default MenuVertical;
