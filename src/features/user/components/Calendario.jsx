import React, { useState, useEffect } from "react";
import { useAgendarCitas } from "../context/AgendarCitasProvider";
import {
  getDiasHabilesPermitidos,
  verificaRestricciones,
} from "../hooks/Calendario";
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

// --- Componente principal ---

const Calendario = () => {
  const [mesActualMostrado, setMesActualMostrado] = useState({
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
  });
  const [config, setConfig] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const { seleccion, actualizarSeleccion } = useAgendarCitas();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Elmer-ing/data_config_center_foragend/main/resources/horarios/config.json"
    )
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  // Sincroniza el día seleccionado con el contexto al montar o cuando cambia la selección
  useEffect(() => {
    if (seleccion?.fecha) {
      setDiaSeleccionado(seleccion.fecha);
      // Opcional: mostrar el mes correspondiente al día seleccionado
      const fecha = new Date(seleccion.fecha);
      setMesActualMostrado({
        mes: fecha.getMonth(),
        año: fecha.getFullYear(),
      });
    }
  }, [seleccion?.fecha]);

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

  const maxDiasHabiles = config?.configuracion.dias_habiles_maximos ?? 15;
  const minDiasAnticipacion =
    config?.configuracion.dias_anticipacion_minima ?? 2;

  // Calcular los próximos N días hábiles (sin contar días de descanso)
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const diasHabilesPermitidos = config
    ? getDiasHabilesPermitidos({ hoy, config, maxDiasHabiles })
    : [];

  const clickEnDia = (dia) => {
    const fechaSeleccionada = new Date(
      mesActualMostrado.año,
      mesActualMostrado.mes,
      dia
    );
    const fechaISO = fechaSeleccionada.toISOString().slice(0, 10);
    setDiaSeleccionado(fechaISO); // <-- Nuevo
    actualizarSeleccion({ fecha: fechaISO });
    console.log(`Día seleccionado: ${fechaISO}`);
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
    <div className="calendario">
      <div className="calendario__header">
        <button
          onClick={() => cambiarMes(-1)}
          className="calendario__header-button calendario__header-button--mesAnterior"
        >
          ▾
        </button>
        <h2>
          {meses[datosMesActualMostrado.nombre]} {mesActualMostrado.año}
        </h2>
        <button
          onClick={() => cambiarMes(1)}
          className="calendario__header-button calendario__header-button--mesSiguiente"
        >
          ▾
        </button>
      </div>
      <div className="calendario__dias">
        {diasDeLaSemanaNombres.map((dia, index) => (
          <div key={index} className="calendario__dia-nombre">
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

          // Lógica de verificación separada
          const { deshabilitado, habil } = verificaRestricciones({
            dia,
            mes: mesActualMostrado.mes,
            año: mesActualMostrado.año,
            config,
            fechaDeHoy,
            minDiasAnticipacion,
            diasHabilesPermitidos,
          });

          const fechaActual = new Date(
            mesActualMostrado.año,
            mesActualMostrado.mes,
            dia
          )
            .toISOString()
            .slice(0, 10);

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
                ${
                  diaSeleccionado === fechaActual
                    ? "calendario__dia--seleccionado"
                    : ""
                }
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
