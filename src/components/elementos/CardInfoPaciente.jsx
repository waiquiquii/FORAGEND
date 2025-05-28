// components/elementos/CardInfoPaciente.jsx

import React from "react";
import "../../styles/CardInfoPaciente.css"; // Asumimos que usarás este archivo para estilos

function CardInfoPaciente({ datos }) {
  if (!datos) return null;

  return (
    <div className="card-info-paciente">
      <div className="card-info-paciente__contenedor">
        <h3 className="card-info-paciente__titulo">Detalles del paciente</h3>
        <div className="card-info-paciente__detalle">
          <span className="card-info-paciente__etiqueta">Nombre paciente:</span>{" "}
          <span className="card-info-paciente__valor">{datos.nombre}</span>
        </div>
        {datos.parentesco && (
          <div className="card-info-paciente__detalle">
            <span className="card-info-paciente__etiqueta">Parentesco:</span>{" "}
            <span className="card-info-paciente__valor">{datos.parentesco}</span>
          </div>
        )}
        {datos.acudiente && (
          <div className="card-info-paciente__detalle">
            <span className="card-info-paciente__etiqueta">Acudiente:</span>{" "}
            <span className="card-info-paciente__valor">{datos.acudiente}</span>
          </div>
        )}
        <div className="card-info-paciente__detalle">
          <span className="card-info-paciente__etiqueta">Tipo documento:</span>{" "}
          <span className="card-info-paciente__valor">{datos.tipoDocumento}</span>
        </div>
        <div className="card-info-paciente__detalle">
          <span className="card-info-paciente__etiqueta">Número documento:</span>{" "}
          <span className="card-info-paciente__valor">{datos.numeroDocumento}</span>
        </div>
      </div>
    </div>
  );
}

export default CardInfoPaciente;
