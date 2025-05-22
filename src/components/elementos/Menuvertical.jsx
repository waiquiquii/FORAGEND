import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/menuvertical.css"; // Archivo CSS para estilos personalizados
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
  faClipboardList,
  faStore,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function MenuVertical() {
  return (
    <div className="menu-vertical">
      <nav className="menu-vertical__nav">
        <ul className="menu-vertical__list">
          <li className="menu-vertical__item">
            <Link className="menu-vertical__link" to="/">
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          <li className="menu-vertical__item">
            <Link className="menu-vertical__link" to="/agendar">
              <FontAwesomeIcon icon={faCalendarAlt} /> Agendar Cita
            </Link>
          </li>
          <li className="menu-vertical__item">
            <Link className="menu-vertical__link" to="/reporte-citas">
              <FontAwesomeIcon icon={faClipboardList} /> Reporte Citas
            </Link>
          </li>

          <li className="menu-vertical__item">
            <Link className="menu-vertical__link" to="/login">
              <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default MenuVertical;
