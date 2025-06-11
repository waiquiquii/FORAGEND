// UserMisCitas.jsx
import React, { useState } from "react";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import CalendarioInfo from "../../../components/ui/CalendarioInfo";

import "../../../styles/features/user/UserMisCitas.css";

export default function UserMisCitas() {
  const CitasAMostrar = [
    {
      cita_id: "12345",
      tipo_cita: "Consulta General",
      cita_fecha: "2023-10-15",
      cita_hora: "10:00 AM",
      cita_doctor: "Dr. Juan Pérez",
      cita_consultorio: "Consultorio 1",
    },
    {
      cita_id: "67890",
      tipo_cita: "Chequeo Anual",
      cita_fecha: "2023-11-20",
      cita_hora: "2:00 PM",
      cita_doctor: "Dra. Ana Gómez",
      cita_consultorio: "Consultorio 2",
    },
    {
      cita_id: "11223",
      tipo_cita: "Seguimiento",
      cita_fecha: "2023-12-05",
      cita_hora: "11:30 AM",
      cita_doctor: "Dr. Carlos López",
      cita_consultorio: "Consultorio 3",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? CitasAMostrar.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === CitasAMostrar.length - 1 ? 0 : prevIndex + 1
    );
  };

  const isUnaCita = CitasAMostrar.length === 1;

  return (
    <div className="misCitas__container">
      <h2 className="misCitas__title">Mis Citas</h2>
      <div className="misCitas__contenido">
        <div className="misCitas__cardsArea">
          {isUnaCita ? (
            <div className="misCitas__slider-inner unica">
              <CardInfoCita
                cita={CitasAMostrar[0]}
                isActive={true}
                otrasClasesParaCard="slider-card unica"
                onClick={() => {}}
              />
            </div>
          ) : (
            <div className="misCitas__slider">
              <button className="misCitas__navBtn" onClick={prevSlide}>
                ⬅
              </button>
              <div className="misCitas__slider-inner">
                {CitasAMostrar.map((cita, index) => {
                  let className = "slider-card";
                  if (index === activeIndex) className += " active";
                  else if (
                    index ===
                    (activeIndex - 1 + CitasAMostrar.length) %
                      CitasAMostrar.length
                  )
                    className += " prev";
                  else if (index === (activeIndex + 1) % CitasAMostrar.length)
                    className += " next";

                  return (
                    <CardInfoCita
                      key={cita.cita_id}
                      cita={cita}
                      isActive={index === activeIndex}
                      otrasClasesParaCard={className}
                      onClick={() => {}}
                    />
                  );
                })}
              </div>
              <button className="misCitas__navBtn" onClick={nextSlide}>
                ➡
              </button>
            </div>
          )}
        </div>

        <div className="misCitas__calendario">
          <CalendarioInfo />
        </div>
      </div>
    </div>
  );
}
