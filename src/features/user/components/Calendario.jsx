import React, { useState, useEffect } from "react";
import "../../../styles/components/calendario.css";

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

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const diasDeLaSemanaNombres = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const Calendario = () => {
  const [mesActualMostrado, setMesActualMostrado] = useState({
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
  });
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Elmer-ing/data_config_center_foragend/main/resources/horarios/config.json"
    )
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

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

  const clickEnDia = (dia) => {
    console.log(`Día seleccionado: ${dia}`);
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

  // Determina si el día es hábil o no según la config
  const esDiaHabil = (dia, mes, año) => {
    if (!config) return false;
    const fecha = new Date(año, mes, dia);
    const nombreDia = diasSemana[fecha.getDay()];
    return !config.configuracion.dias_descanso.includes(nombreDia);
  };

  // Parámetros dinámicos desde la config
  const maxDiasHabiles = config?.configuracion.dias_habiles_maximos ?? 15;
  const minDiasAnticipacion =
    config?.configuracion.dias_anticipacion_minima ?? 2;

  return (
    <div className="calendario">
      <div className="calendario__header">
        <button onClick={() => cambiarMes(-1)}>Anterior</button>
        <h2>
          {meses[datosMesActualMostrado.nombre]} {mesActualMostrado.año}
        </h2>
        <button onClick={() => cambiarMes(1)}>Siguiente</button>
      </div>
      <div className="calendario__dias">
        {diasDeLaSemanaNombres.map((dia, index) => (
          <div key={index} className="calendario__dia-nombre">
            {dia}
          </div>
        ))}
        {Array.from({ length: datosMesActualMostrado.dias }, (_, index) => {
          const dia = index + 1;
          const fechaSeleccionada = new Date(
            mesActualMostrado.año,
            mesActualMostrado.mes,
            dia,
            23,
            59,
            59
          );
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);

          // Día hábil según config
          const habil = esDiaHabil(
            dia,
            mesActualMostrado.mes,
            mesActualMostrado.año
          );

          const isFirstDay = dia === 1;
          const gridStart =
            isFirstDay && datosMesActualMostrado.primerDiaSemanaIndex !== 0
              ? datosMesActualMostrado.primerDiaSemanaIndex
              : undefined;

          // No seleccionar días anteriores a hoy
          const esAnteriorAHoy = fechaSeleccionada < hoy;

          // Solo se puede seleccionar con mínimo de anticipación
          const diffMs = fechaSeleccionada - hoy;
          const diffDias = diffMs / (1000 * 60 * 60 * 24);
          const menosDeAnticipacion = diffDias < minDiasAnticipacion;

          // Calcular los próximos N días hábiles (sin contar días de descanso)
          let diasHabilesContados = 0;
          let fechaIter = new Date(hoy);
          const diasHabilesPermitidos = [];
          while (diasHabilesContados < maxDiasHabiles) {
            const nombreDia = diasSemana[fechaIter.getDay()];
            if (!config?.configuracion.dias_descanso.includes(nombreDia)) {
              diasHabilesPermitidos.push(fechaIter.toISOString().slice(0, 10));
              diasHabilesContados++;
            }
            fechaIter.setDate(fechaIter.getDate() + 1);
          }
          const fechaStr = fechaSeleccionada.toISOString().slice(0, 10);
          const fueraDeRangoHabiles = !diasHabilesPermitidos.includes(fechaStr);

          // Deshabilitar si es anterior a hoy, no hábil, menos de anticipación, o fuera de los N hábiles
          const deshabilitado =
            esAnteriorAHoy ||
            !habil ||
            menosDeAnticipacion ||
            fueraDeRangoHabiles;

          return (
            <div
              key={dia}
              className={`calendario__dia
                ${
                  dia === fechaDeHoy.numeroDia &&
                  mesActualMostrado.mes === fechaDeHoy.mes &&
                  mesActualMostrado.año === fechaDeHoy.año
                    ? "calendario__dia--hoy"
                    : ""
                }
                ${
                  habil ? "calendario__dia--habil" : "calendario__dia--no-habil"
                }
                ${deshabilitado ? "calendario__dia--deshabilitado" : ""}
              `}
              style={
                isFirstDay && gridStart ? { "--grid-start": gridStart } : {}
              }
              data-grid-start={isFirstDay && gridStart ? true : undefined}
              onClick={() => (!deshabilitado ? clickEnDia(dia) : undefined)}
              tabIndex={deshabilitado ? -1 : 0}
              aria-disabled={deshabilitado}
            >
              {dia}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendario;
