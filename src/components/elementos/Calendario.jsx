import React from "react";
import "../../styles/Calendario.css";

const Calendario = () => {
  const obtenerMes = (fecha) => {
    const { año, mes: numeroMes } = fecha;
    const meses = {
      1: { nombre: "enero", dias: 31 },
      2: {
        nombre: "febrero",
        dias: año % 4 === 0 && (año % 100 !== 0 || año % 400 === 0) ? 29 : 28,
      }, // Verifica años bisiestos
      3: { nombre: "marzo", dias: 31 },
      4: { nombre: "abril", dias: 30 },
      5: { nombre: "mayo", dias: 31 },
      6: { nombre: "junio", dias: 30 },
      7: { nombre: "julio", dias: 31 },
      8: { nombre: "agosto", dias: 31 },
      9: { nombre: "septiembre", dias: 30 },
      10: { nombre: "octubre", dias: 31 },
      11: { nombre: "noviembre", dias: 30 },
      12: { nombre: "diciembre", dias: 31 },
    };

    return meses[numeroMes] || { nombre: "mes inválido", dias: 0 };
  };

  const diasDeLaSemana = {
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
    6: "sábado",
    7: "domingo",
  };

  /**
   * Obtiene la fecha actual desglosada en día, mes y año según una zona horaria específica.
   *
   * @param {string} zonaHoraria - La zona horaria en formato IANA (por ejemplo, "Europe/Madrid").
   * @returns {{año: number, mes: number, dia: number}} Un objeto que contiene el año, mes y día como números enteros.
   *
   * Nota: El número 10 en `parseInt(valor, 10)` especifica que el valor debe ser interpretado en base decimal.
   */
  const obtenerFechaActual = (zonaHoraria) => {
    const fecha = new Date().toLocaleString("es-ES", { timeZone: zonaHoraria });
    const [dia, mes, año] = fecha.split(/[\s/]+/);
    const diaDeLaSemana = new Date().toLocaleString("es-ES", {
      timeZone: zonaHoraria,
      weekday: "long",
    });
    return {
      año: parseInt(año, 10),
      mes: parseInt(mes, 10),
      dia: {
        numero: parseInt(dia, 10),
        nombre: diaDeLaSemana,
      },
    };
  };

  // Zonas horarias de ejemplo
  // const zonasHorarias = {
  //     "America/Bogota",
  //     "Europe/Madrid",
  //     "Asia/Tokyo",
  //     "America/New_York"
  // };

  console.log(obtenerFechaActual("America/Bogota")); // { año: 2023, mes: 10, dia: 5 }

  const fechaActual = obtenerFechaActual("America/Bogota");
  const mesActual = obtenerMes(fechaActual);

  return (
    <div className="calendario">
      <h2 className="calendario__mes">{mesActual.nombre.toUpperCase()}</h2>
      <ol className="calendarioList">
        {Object.values(diasDeLaSemana).map((nombreDia, index) => (
          <li key={index} className="calendarioList__nombreDia">
            {nombreDia}
          </li>
        ))}
        {Array.from({ length: mesActual.dias }, (_, index) => {
          const dia = index + 1;
          const esDiaActual = dia === fechaActual.dia.numero;
          const esPrimerDia = dia === 1;
          const tieneCita = false; // Aquí puedes agregar lógica para determinar si hay una cita en este día

          // Calcula la posición del primer día del mes
          const primerDiaSemana = new Date(
            fechaActual.año,
            fechaActual.mes - 1,
            1
          ).getDay(); // 0 (domingo) a 6 (sábado)
          const gridColumnStart = esPrimerDia
            ? primerDiaSemana === 0
              ? 7
              : primerDiaSemana
            : undefined;

          return (
            <li
              key={dia}
              className={`calendarioList__dia ${
                esDiaActual ? "calendarioList__dia--actual" : ""
              } ${tieneCita ? "calendarioList__dia--cita" : ""}`}
              style={esPrimerDia ? { gridColumnStart } : {}}
            >
              {dia}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Calendario;
