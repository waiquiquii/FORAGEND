import React from "react";
import { Link } from "react-router-dom"; // Importación correcta de Link desde react-router-dom
import Home from "../adapters/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/perfilUsuario.css";

function Perfilusuario() {
  return (
    <Home>
      <div className="contenedor-perfil">
        <h1>Perfil de Usuario</h1>
        <form className="form-group formperfil">
          <label className="label-usuario">
            Nombres:
            <input
              type="text"
              className="form-control my-hover-input"
              name="nombre"
              placeholder="Nombres"
            />
          </label>
          <label className="label-usuario">
            Apellidos:
            <input
              type="text"
              className="form-control  my-hover-input"
              name="Apellidos"
              placeholder="Apellidos"
            />
          </label>
          <label className="label-usuario">
            Dirección:
            <input
              type="text"
              className="form-control  my-hover-input"
              name="Direccion"
              placeholder="Direccion"
            />
          </label>
          <label className="label-usuario">
            Telefono:
            <input
              type="number"
              className="form-control  my-hover-input"
              name="Telefono"
              placeholder="Telefono"
            />
          </label>
          <label className="label-usuario">
            Email:
            <input
              type="email"
              className="form-control  my-hover-input"
              name="Email"
              placeholder="Email"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </Home>
  );
}

export default Perfilusuario;
