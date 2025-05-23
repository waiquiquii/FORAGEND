import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../../styles/DropdownMenu.css"; // Importa los estilos personalizados
import { Link } from "react-router-dom";
function DropdownMenu() {
  return (
    <div className="menuuser">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <Link className="dropdown-item" to="/Perfilusuario">
            Perfil
          </Link>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
