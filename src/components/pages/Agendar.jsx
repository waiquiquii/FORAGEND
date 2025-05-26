import React, { useState, useContext } from "react";
import { createContext } from "react";
import "../../styles/Agendar.css";
import Home from "../adapters/Home";
import SeleccionadorDeCita from "../elementos/SeleccionadorDeCita.jsx";
import Calendario from "../elementos/Calendario.jsx";
import FormAddFamiliar from "../elementos/FormAddFamiliar.jsx";
// import FormDetallesCita from "../elementos/FormDetallesCita.jsx";

// Importar constantes para los pasos del agendamiento
import { PASOS_AGENDAR } from "../../utils/pasosAndOpciones.js";

import FormDetallesCita from "../elementos/FormDetallesCita.jsx";

export const CalendarioContexto = createContext(null);

function Agendar() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null); // Aquí se guarda la fecha selecionada del usuario
  const [horariosDisponibles, setHorariosDisponibles] = useState({});

  // const [mostrar, setMostrar] = useState(
  //   renderizar.SELECCIONAR_SOLICITANTE.componente
  // );

  const renderizar = {
    [PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.id]: {
      componente: (
        <SeleccionadorDeCita
          titulo={PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.title}
          opciones={PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.opciones}
          opcionPorDefecto={
            PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.opciones.default
          }
        />
      ),
    },
    // [PASOS_AGENDAR.SELECCIONAR_DETALLES.id]: {
    //   componente: <FormDetallesCita />,
    // },
    // [PASOS_AGENDAR.AGREGAR_DEPENDIENTE.id]: {
    //   componente: (
    //     <FormAddFamiliar
    //       otroBoton={<BotonAtras onClick={manejarIrAtras} />}
    //       siguientePaso={manejarEnvioFamiliar}
    //     />
    //   ),
    // },
  };

  return (
    <Home>
      <CalendarioContexto.Provider
        value={{
          fechaSeleccionada,
          setFechaSeleccionada,
          horariosDisponibles,
          setHorariosDisponibles,
        }}
      >
        <div className="agendar-contenedor">
          <h1>Agendar Cita Médica</h1>

          <Calendario />
        </div>
      </CalendarioContexto.Provider>
    </Home>
  );
}

export default Agendar;
