import React from "react";
import "../../styles/CardInfoCita.css";

// Asegúrate de que este componente recibe la prop 'cita', 'isActive' y 'style'
function CardInfoCita({ cita, isActive, style, onClick }) { // ACEPTA `style` y `onClick`
  if (!cita) {
    return null; // Manejo básico si no hay datos de cita
  }

  return (
    <div
      className={`card-info-cita ${isActive ? "card-info-cita--active" : ""}`}
      style={style} // APLICA LOS ESTILOS CALCULADOS POR EL PADRE
      onClick={onClick} // APLICA EL MANEJADOR DE CLIC RECIBIDO
    >
      <div className="card-info-cita__id-container">
        <p className="card-info-cita__id">{cita.cita_id}</p>
      </div>
      <div className="card-info-cita__title-container">
        <h2 className="card-info-cita__title">{cita.tipo_cita}</h2>
      </div>
      <div className="card-info-cita__content-container">
        <div className="card-info-cita__content--left">
          <p className="card-info-cita__text">Fecha:</p>
          <p className="card-info-cita__text">Hora:</p>
          <p className="card-info-cita__text">Doctor/a:</p>
          <p className="card-info-cita__text">Consultorio:</p>
        </div>
        <div className="card-info-cita__content--right">
          <p className="card-info-cita__text">{cita.cita_fecha}</p>
          <p className="card-info-cita__text">{cita.cita_hora}</p>
          <p className="card-info-cita__text">{cita.cita_doctor}</p>
          <p className="card-info-cita__text">{cita.cita_consultorio}</p>
        </div>
      </div>
    </div>
  );
}

export default CardInfoCita;