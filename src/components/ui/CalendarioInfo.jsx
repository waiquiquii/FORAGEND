import React, { useState } from "react";
import "../../styles/ui/calendarioInfo.css";

const meses = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};

const diasDeLaSemanaNombres = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const CalendarioInfo = ({ citasAgendadas = [] }, otherClassContainer) => {
  const [mesActualMostrado, setMesActualMostrado] = useState({
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
  });

  const fechaDeHoy = {
    numeroDia: new Date().getDate(),
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
  };

  const datosMesActualMostrado = {
    nombre: mesActualMostrado.mes + 1,
    dias: new Date(
      mesActualMostrado.año,
      mesActualMostrado.mes + 1,
      0
    ).getDate(),
    primerDiaSemanaIndex:
      new Date(mesActualMostrado.año, mesActualMostrado.mes, 1).getDay() || 7,
  };

  // Función para verificar si un día tiene citas agendadas
  const tieneCitaAgendada = (dia) => {
    const fechaBuscada = new Date(
      mesActualMostrado.año,
      mesActualMostrado.mes,
      dia
    );
    const fechaISO = fechaBuscada.toISOString().slice(0, 10);

    return citasAgendadas.some((cita) => {
      const fechaCita = new Date(cita.fecha).toISOString().slice(0, 10);
      return fechaCita === fechaISO;
    });
  };

  // Función para obtener el número de citas en un día
  const getCantidadCitas = (dia) => {
    const fechaBuscada = new Date(
      mesActualMostrado.año,
      mesActualMostrado.mes,
      dia
    );
    const fechaISO = fechaBuscada.toISOString().slice(0, 10);

    return citasAgendadas.filter((cita) => {
      const fechaCita = new Date(cita.fecha).toISOString().slice(0, 10);
      return fechaCita === fechaISO;
    }).length;
  };

  const cambiarMes = (incremento) => {
    setMesActualMostrado((prev) => {
      const nuevoMes = prev.mes + incremento;
      const nuevoAño = prev.año + Math.floor(nuevoMes / 12);
      return {
        mes: (nuevoMes + 12) % 12,
        año: nuevoAño,
      };
    });
  };

  return (
    <div className={`calendarioInfo ${otherClassContainer}`}>
      <div className="calendarioInfo__header">
        <button
          onClick={() => cambiarMes(-1)}
          className="calendarioInfo__header-button calendarioInfo__header-button--mesAnterior"
        >
          ▾
        </button>
        <h2>
          {meses[datosMesActualMostrado.nombre]} {mesActualMostrado.año}
        </h2>
        <button
          onClick={() => cambiarMes(1)}
          className="calendarioInfo__header-button calendarioInfo__header-button--mesSiguiente"
        >
          ▾
        </button>
      </div>

      <div className="calendarioInfo__dias">
        {diasDeLaSemanaNombres.map((dia, index) => (
          <div key={index} className="calendarioInfo__dia-nombre">
            {dia}
          </div>
        ))}

        {Array.from({ length: datosMesActualMostrado.dias }, (_, index) => {
          const dia = index + 1;
          const isFirstDay = dia === 1;
          const gridStart =
            isFirstDay && datosMesActualMostrado.primerDiaSemanaIndex !== 0
              ? datosMesActualMostrado.primerDiaSemanaIndex
              : undefined;

          const tieneCita = tieneCitaAgendada(dia);
          const cantidadCitas = tieneCita ? getCantidadCitas(dia) : 0;
          const esHoy =
            dia === fechaDeHoy.numeroDia &&
            mesActualMostrado.mes === fechaDeHoy.mes &&
            mesActualMostrado.año === fechaDeHoy.año;

          return (
            <div
              key={dia}
              className={`calendarioInfo__dia
                ${esHoy ? "calendarioInfo__dia--hoy" : ""}
                ${
                  tieneCita
                    ? "calendarioInfo__dia--con-cita"
                    : "calendarioInfo__dia--sin-cita"
                }
              `}
              style={
                isFirstDay && gridStart ? { "--grid-start": gridStart } : {}
              }
              data-grid-start={isFirstDay && gridStart ? true : undefined}
              title={
                tieneCita
                  ? `${cantidadCitas} cita(s) agendada(s)`
                  : "Sin citas agendadas"
              }
            >
              <span className="calendarioInfo__dia-numero">{dia}</span>
              {tieneCita && (
                <span className="calendarioInfo__dia-indicador">
                  {cantidadCitas}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarioInfo;
