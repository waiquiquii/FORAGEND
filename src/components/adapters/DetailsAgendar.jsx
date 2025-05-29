import React from "react";
import { PASOS_AGENDAR } from "../../utils/pasosAgendar";

// Importación de componentes
import Calendario from "../elementos/Calendario";
import CardInfoPaciente from "../elementos/CardInfoPaciente";
import CardInfoCita from "../elementos/CardInfoCita";

// Importación de datos de prueba
import citaInfo from "../../data/citaInfo.json";

// ¡Aquí importamos el CSS directamente!
import "../../styles/details-agendar.css";

const DetailsAgendar = ({ children, pasoActual }) => {
  // Ejemplo de datos de paciente a agendar
  const pacienteAgendar = {
    nombre: "Carlos Ruiz",
    parentesco: "Hijo",
    acudiente: "Marta Ruiz",
    tipoDocumento: "TI",
    numeroDocumento: "11223344",
  };

  function renderizarCard(pasoActual) {
    if (pasoActual === PASOS_AGENDAR.SELECCIONAR_FECHA.id) {
      return <CardInfoCita cita={citaInfo[0]} />; // Reemplazar por datos reales
    } else {
      return <CardInfoPaciente datos={pacienteAgendar} />; // Reemplazar por datos reales
    }
  }

  return (
    <div className="details-agendar">
      <div className="details-agendar__header">
        {/* Contenedor de la derecha: Título y Calendario */}
        <div className="details-agendar__contenedor--derecha">
          <h2 className="details-agendar__title">
            {PASOS_AGENDAR.SELECCIONAR_FECHA.title}
          </h2>
          {/* Asegúrate de que el componente Calendario reciba la clase 'calendario'
              para que los estilos en el CSS se apliquen correctamente. */}
          <Calendario className="calendario" />
        </div>
        {/* Contenedor de la izquierda: Card y Select */}
        <div className="details-agendar__contenedor--izquierda">
          <div className="details-agendar__card-container">
            {renderizarCard(pasoActual)}
          </div>
          <div className="details-agendar__select-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAgendar;
