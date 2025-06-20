import React from "react";

import "../../styles/ui/CardInfoCita.css";

function CardInfoCita({ cita, isActive, otrasClasesParaCard, onClick }) {
  if (!cita) {
    return null;
  }

  const {
    cita_estado,
    cita_id,
    tipo_cita,
    cita_fecha,
    cita_hora,
    cita_paciente,
    cita_parentesco,
    cita_doctor,
    cita_consultorio,
  } = cita;

  const estado_or_id = cita.cita_estado || cita.cita_id;

  return (
    <div
      className={`card-info-cita ${
        isActive ? "card-info-cita--active" : ""
      } ${otrasClasesParaCard}`}
      onClick={onClick}
    >
      {estado_or_id && (
        <div className={`card-info-cita__status_id-container`}>
          {cita_estado && (
            <div className={`card-info-cita__id-container`}>
              <p className="card-info-cita__id">{cita_estado}</p>
            </div>
          )}
          {cita_id && (
            <div className={`card-info-cita__id-container`}>
              <p className="card-info-cita__id">{cita_id}</p>
            </div>
          )}
        </div>
      )}
      <div className="card-info-cita__title-container">
        <h2 className="card-info-cita__title">{tipo_cita}</h2>
      </div>
      <div className="card-info-cita__content-container">
        <p className="card-info-cita__detail">
          <span className="card-info-cita__label">Fecha:</span> {cita_fecha}
        </p>
        <p className="card-info-cita__detail">
          <span className="card-info-cita__label">Hora:</span> {cita_hora}
        </p>
        {cita_paciente && (
          <p className="card-info-cita__detail">
            <span className="card-info-cita__label">Paciente:</span>
            {cita_paciente}
          </p>
        )}
        {cita_parentesco && (
          <p className="card-info-cita__detail">
            <span className="card-info-cita__label">Parentesco:</span>
            {cita_parentesco}
          </p>
        )}
        <p className="card-info-cita__detail">
          <span className="card-info-cita__label">Doctor/a:</span> {cita_doctor}
        </p>
        <p className="card-info-cita__detail">
          <span className="card-info-cita__label">Consultorio:</span>
          {cita_consultorio}
        </p>
      </div>
    </div>
  );
}

export default CardInfoCita;
