import React, { useState } from "react";
import "../../styles/CalendarioInteractivo.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CalendarioInteractivo = ({ onFechaSeleccionadaChange }) => {
  const hoy = new Date();

  const [mesActual] = useState({
    año: hoy.getFullYear(),
    mes: hoy.getMonth() + 1,
  });

  const [mesActualMostrado, setMesActualMostrado] = useState(mesActual);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const obtenerDatosMes = (año, numeroMes) => {
    const primerDiaDelMes = new Date(año, numeroMes - 1, 1);
    const ultimoDiaDelMes = new Date(año, numeroMes, 0);

    return {
      nombre: format(primerDiaDelMes, "MMMM", { locale: es }),
      dias: ultimoDiaDelMes.getDate(),
      primerDiaSemanaIndex:
        primerDiaDelMes.getDay() === 0 ? 7 : primerDiaDelMes.getDay(),
    };
  };

  const diasDeLaSemana = ["L", "M", "M", "J", "V", "S", "D"];
  const fechaActual = {
    año: hoy.getFullYear(),
    mes: hoy.getMonth() + 1,
    dia: hoy.getDate(),
  };

  const datosMes = obtenerDatosMes(
    mesActualMostrado.año,
    mesActualMostrado.mes
  );

  const handleClickDia = (dia) => {
    const nuevaFecha = {
      numeroDia: dia,
      mes: mesActualMostrado.mes,
      año: mesActualMostrado.año,
    };

    setFechaSeleccionada(nuevaFecha);
    onFechaSeleccionadaChange?.(nuevaFecha);
  };

  const cambiarMes = (direccion) => {
    if (direccion === "anterior" && !esMesActual()) {
      setMesActualMostrado(mesActual);
      return;
    }

    if (direccion === "siguiente" && esMesActual()) {
      const nuevoMes = mesActual.mes === 12 ? 1 : mesActual.mes + 1;
      const nuevoAño = mesActual.mes === 12 ? mesActual.año + 1 : mesActual.año;
      setMesActualMostrado({ año: nuevoAño, mes: nuevoMes });
    }
  };

  const esMesActual = () => {
    return (
      mesActualMostrado.mes === mesActual.mes &&
      mesActualMostrado.año === mesActual.año
    );
  };

  const esDiaActual = (dia) => {
    return (
      dia === fechaActual.dia &&
      mesActualMostrado.mes === fechaActual.mes &&
      mesActualMostrado.año === fechaActual.año
    );
  };

  const esDiaSeleccionado = (dia) => {
    return (
      fechaSeleccionada &&
      dia === fechaSeleccionada.numeroDia &&
      mesActualMostrado.mes === fechaSeleccionada.mes &&
      mesActualMostrado.año === fechaSeleccionada.año
    );
  };

  return (
    <div className="calendario-interactivo">
      <h2 className="calendario-interactivo__mes">
        {datosMes.nombre.toUpperCase()} {mesActualMostrado.año}
      </h2>

      <div className="calendario-interactivo__navegacion">
        <button
          onClick={() => cambiarMes("anterior")}
          disabled={esMesActual()}
          className="calendario-interactivo__boton-navegacion"
        >
          ◀
        </button>

        <button
          onClick={() => cambiarMes("siguiente")}
          disabled={!esMesActual()}
          className="calendario-interactivo__boton-navegacion"
        >
          ▶
        </button>
      </div>

      <ol className="calendario-interactivo__lista">
        {diasDeLaSemana.map((dia, index) => (
          <li key={index} className="calendario-interactivo__nombre-dia">
            {dia}
          </li>
        ))}

        {Array.from({ length: datosMes.primerDiaSemanaIndex - 1 }).map(
          (_, i) => (
            <li
              key={`empty-${i}`}
              className="calendario-interactivo__dia calendario-interactivo__dia--vacio"
            ></li>
          )
        )}

        {Array.from({ length: datosMes.dias }, (_, i) => {
          const dia = i + 1;
          return (
            <li
              key={dia}
              onClick={() => handleClickDia(dia)}
              className={`
                calendario-interactivo__dia 
                ${esDiaActual(dia) ? "calendario-interactivo__dia--actual" : ""}
                ${
                  esDiaSeleccionado(dia)
                    ? "calendario-interactivo__dia--seleccionado"
                    : ""
                }
              `}
              style={
                dia === 1
                  ? { gridColumnStart: datosMes.primerDiaSemanaIndex }
                  : {}
              }
            >
              {dia}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default CalendarioInteractivo;
