import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Importa los estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Importa el JS necesario para Bootstrap
import '../styles/DropdownMenu.css';  // Importa los estilos personalizados
import Perfilusuario from './Perfilusuario';  // Importa el componente Perfilusuario
function DropdownMenu() {
  return (
    <div className="menuuser">
      <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        id="dropdownMenuButton" 
        data-bs-toggle="dropdown" 
        aria-expanded="false">
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a className="dropdown-item" href="#">Perfil
      </a></li>
      <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
