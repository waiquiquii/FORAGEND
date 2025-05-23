import React from "react";
import citaInfo from "../../data/citaInfo.json";
import "../../styles/CardInfoCita.css";

function CardInfoCita() {
  return (
    <>
      {citaInfo.map((cita, index) => (
        <div key={index} className="card-info-cita">
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
      ))}
    </>
  );
}


export default CardInfoCita;
