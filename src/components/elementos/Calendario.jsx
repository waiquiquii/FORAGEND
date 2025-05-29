import React, { useState, useEffect } from "react";
import "../../styles/Calendario.css";

import { format } from "date-fns";
import { es } from "date-fns/locale";

const Calendario = ({ onFechaSeleccionadaChange }) => {
  const [mesActualMostrado, setMesActualMostrado] = useState(() => {
    const today = new Date();
    return {
      año: today.getFullYear(),
      mes: today.getMonth() + 1, // getMonth() es 0-indexado
    };
  });

  const obtenerDatosMes = (año, numeroMes) => {
    const primerDiaDelMes = new Date(año, numeroMes - 1, 1);
    const ultimoDiaDelMes = new Date(año, numeroMes, 0);
    const nombreMes = format(primerDiaDelMes, "MMMM", { locale: es });
    const diasEnMes = ultimoDiaDelMes.getDate();

    let primerDiaSemanaIndex = primerDiaDelMes.getDay();
    if (primerDiaSemanaIndex === 0) {
      primerDiaSemanaIndex = 7;
    }

    return {
      nombre: nombreMes,
      dias: diasEnMes,
      primerDiaSemanaIndex: primerDiaSemanaIndex,
    };
  };

  const diasDeLaSemanaNombres = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const obtenerFechaActualSimple = () => {
    const hoy = new Date();
    return {
      año: hoy.getFullYear(),
      mes: hoy.getMonth() + 1,
      numeroDia: hoy.getDate(),
      nombreDia: format(hoy, "eeee", { locale: es }),
    };
  };

  const fechaDeHoy = obtenerFechaActualSimple();
  const datosMesActualMostrado = obtenerDatosMes(
    mesActualMostrado.año,
    mesActualMostrado.mes
  );

  const clickEnDia = (diaNumero) => {
    const miFechaSeleccionada = {
      numeroDia: parseInt(diaNumero, 10),
      mes: mesActualMostrado.mes,
      año: mesActualMostrado.año,
    };

    // Llama a la función de prop para actualizar la fecha seleccionada en el padre
    if (onFechaSeleccionadaChange) {
      onFechaSeleccionadaChange(miFechaSeleccionada);
    }

    console.log("Fecha seleccionada (local):", miFechaSeleccionada);
  };

  // El useEffect que generaba horarios iniciales también se elimina,
  // ya que no hay necesidad de pasar horarios al padre al inicio.

  return (
    <div className="calendario">
      <h2 className="calendario__mes">
        {datosMesActualMostrado.nombre.toUpperCase()} {mesActualMostrado.año}
      </h2>
      <ol className="calendarioList">
        {diasDeLaSemanaNombres.map((nombreDia, index) => (
          <li key={index} className="calendarioList__nombreDia">
            {nombreDia}
          </li>
        ))}
        {Array.from({ length: datosMesActualMostrado.dias }, (_, index) => {
          const dia = index + 1;
          const esDiaActual =
            dia === fechaDeHoy.numeroDia &&
            mesActualMostrado.mes === fechaDeHoy.mes &&
            mesActualMostrado.año === fechaDeHoy.año;

          const gridColumnStart =
            dia === 1 ? datosMesActualMostrado.primerDiaSemanaIndex : undefined;

          const tieneCita = false; // Puedes pasar esto como prop si es necesario

          return (
            <li
              key={dia}
              onClick={() => clickEnDia(dia)}
              className={`calendarioList__dia ${
                esDiaActual ? "calendarioList__dia--actual" : ""
              } ${tieneCita ? "calendarioList__dia--cita" : ""}`}
              style={dia === 1 ? { gridColumnStart } : {}}
            >
              {dia}
            </li>
          );
        })}
      </ol>
      {/* Opcional: Botones para navegar entre meses */}
      {/* <div className="calendario-nav">
        <button
          onClick={() =>
            setMesActualMostrado((prev) => ({ ...prev, mes: prev.mes - 1 }))
          }
        >
          Anterior
        </button>
        <button
          onClick={() =>
            setMesActualMostrado((prev) => ({ ...prev, mes: prev.mes + 1 }))
          }
        >
          Siguiente
        </button>
      </div> */}
    </div>
  );
};

export default Calendario;
