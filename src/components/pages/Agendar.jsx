import React, { useState } from "react";

// Asegúrate de que las rutas a tus componentes sean correctas
import Home from "../adapters/Home";
import DetailsAgendar from "../adapters/DetailsAgendar";
import FormAcudiente from "../elementos/FormAcudiente";
import FormDependiente from "../elementos/FormDependiente";
import SelectStep from "../elementos/SelectStep";
import Botones from "../elementos/Botones";

// Definimos los "estados" o "vistas" de nuestro flujo
const FLUJO_VISTAS = {
  INICIO_SELECT_STEP: "inicio_select_step",
  FORMULARIO_ACUDIENTE: "formulario_acudiente",
  FORMULARIO_DEPENDIENTE: "formulario_dependiente",
  PRIMER_DETALLE_SELECT_STEP: "primer_detalle_select_step",
  SEGUNDO_DETALLE_SELECT_STEP: "segundo_detalle_select_step",
  TERCER_DETALLE_SELECT_STEP: "tercer_detalle_select_step", // <-- Nueva vista
  CUARTO_DETALLE_SELECT_STEP: "cuarto_detalle_select_step", // <-- Nueva vista
  FINAL_VERIFICAR: "final_verificar",
  FINAL_AGENDAR: "final_agendar",
};

function Agendar() {
  const [currentView, setCurrentView] = useState(
    FLUJO_VISTAS.INICIO_SELECT_STEP
  );
  const [acudienteData, setAcudienteData] = useState(null);
  const [dependienteData, setDependienteData] = useState(null);
  const [initialSelectedOption, setInitialSelectedOption] = useState("");
  const [secondSelectOption, setSecondSelectOption] = useState(""); // <-- Nuevo estado para la opción del segundo SelectStep

  // --- Manejadores de Formularios ---
  const handleAcudienteValidatedSubmit = (data) => {
    console.log("Datos del Acudiente validados:", data);
    setAcudienteData(data);
    setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
  };

  const handleDependienteValidatedSubmit = (data) => {
    console.log("Datos del Dependiente validados:", data);
    setDependienteData(data);
    setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
  };

  const handleAcudienteChange = (data) => {
    // console.log("Acudiente data en tiempo real:", data);
  };
  const handleDependienteChange = (data) => {
    // console.log("Dependiente data en tiempo real:", data);
  };

  const handleInitialSelectChange = (value) => {
    setInitialSelectedOption(value);
    console.log("Opción inicial seleccionada:", value);
  };

  // <-- Nuevo manejador para el segundo SelectStep
  const handleSecondSelectChange = (value) => {
    setSecondSelectOption(value);
    console.log("Opción del segundo SelectStep seleccionada:", value);
  };

  // --- Manejadores de Navegación (para el componente Botones) ---
  const handleSiguiente = () => {
    switch (currentView) {
      case FLUJO_VISTAS.INICIO_SELECT_STEP:
        if (initialSelectedOption === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (initialSelectedOption === "Segunda Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          alert("Por favor, selecciona una opción válida para continuar.");
        }
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
        // Lógica condicional basada en la selección del segundo SelectStep
        if (secondSelectOption === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP);
        } else if (
          secondSelectOption === "Seleccionar" ||
          !secondSelectOption
        ) {
          alert("Por favor, selecciona una opción válida para continuar.");
          return; // Detiene la función si no se ha seleccionado nada
        } else {
          // Si selecciona algo diferente a "Primera Opción", va al cuarto
          setCurrentView(FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP:
        // El tercer SelectStep siempre lleva al cuarto
        setCurrentView(FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.FINAL_VERIFICAR);
        break;
      default:
        console.warn(
          "Siguiente: Vista no manejada o fin del flujo inesperado."
        );
        break;
    }
  };

  const handleAtras = () => {
    switch (currentView) {
      case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
      case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
        setCurrentView(FLUJO_VISTAS.INICIO_SELECT_STEP);
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        if (acudienteData) {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (dependienteData) {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          setCurrentView(FLUJO_VISTAS.INICIO_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP: // Atrás desde el tercer SelectStep
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP: // Atrás desde el cuarto SelectStep
        // Si llegamos al cuarto desde el tercero, volvemos al tercero.
        // Si llegamos al cuarto directamente desde el segundo, volvemos al segundo.
        // Podríamos guardar el 'path' de navegación o inferirlo. Por simplicidad, volvamos al tercero por ahora,
        // asumiendo que el flujo es lineal desde tercero a cuarto, o del segundo directamente al cuarto.
        // Para una lógica más robusta, podrías necesitar un historial de vistas.
        // Por ahora, si estás en el cuarto, siempre puedes volver al segundo o al tercero.
        // Vamos a asumir que si llegas al cuarto, el último paso fue o el segundo o el tercero.
        // Aquí puedes ajustar según tu lógica específica.
        if (secondSelectOption === "Primera Opción") {
          // Si la opción del segundo fue "Primera", significa que pasamos por el tercero
          setCurrentView(FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP);
        } else {
          // Si no, significa que pasamos directamente del segundo al cuarto
          setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.FINAL_VERIFICAR:
        setCurrentView(FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP); // Volver al cuarto
        break;
      case FLUJO_VISTAS.FINAL_AGENDAR:
        setCurrentView(FLUJO_VISTAS.FINAL_VERIFICAR);
        break;
      default:
        console.warn(
          "Atrás: Vista no manejada o no hay pasos para retroceder."
        );
        break;
    }
  };

  const handleVerificar = () => {
    console.log("Verificando datos antes de agendar...");
    setCurrentView(FLUJO_VISTAS.FINAL_AGENDAR);
  };

  const handleAgendar = () => {
    console.log("¡Cita agendada!");
    setAcudienteData(null);
    setDependienteData(null);
    setInitialSelectedOption("");
    setSecondSelectOption(""); // Limpiar también la opción del segundo SelectStep
    setCurrentView(FLUJO_VISTAS.INICIO_SELECT_STEP);
  };

  const allHandleFunctionsBotons = {
    handleSiguiente,
    handleAtras,
    handleVerificar,
    handleAgendar,
  };

  // --- Lógica para el control de botones según la vista actual ---
  let modoActualBotones = [];
  switch (currentView) {
    case FLUJO_VISTAS.INICIO_SELECT_STEP:
      modoActualBotones = ["siguiente"];
      break;
    case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
    case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
      modoActualBotones = ["atras"];
      break;
    case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
      // El botón siguiente se habilita/deshabilita en base a secondSelectOption
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP: // Tercer SelectStep, siempre va al cuarto
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP: // Cuarto SelectStep
      modoActualBotones = ["atras", "siguiente"]; // Va a Verificar
      break;
    case FLUJO_VISTAS.FINAL_VERIFICAR:
      modoActualBotones = ["atras", "verificar"];
      break;
    case FLUJO_VISTAS.FINAL_AGENDAR:
      modoActualBotones = ["agendar"];
      break;
    default:
      modoActualBotones = [];
      break;
  }

  // Lógica para deshabilitar el botón "Siguiente" condicionalmente
  const isSiguienteDisabled = () => {
    if (
      currentView === FLUJO_VISTAS.INICIO_SELECT_STEP &&
      (initialSelectedOption === "Seleccionar" || !initialSelectedOption)
    ) {
      return true;
    }
    if (
      currentView === FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP &&
      (secondSelectOption === "Seleccionar" || !secondSelectOption)
    ) {
      return true;
    }
    // Añade más condiciones para deshabilitar el botón "Siguiente" en otras vistas si es necesario
    return false;
  };

  return (
    <Home>
      <div className="agendar-contenedor">
        <h1 className="agendar-contenedor__titulo">Agendar Cita Médica</h1>
        <p className="agendar-contenedor__descripcion">
          Por favor, complete los siguientes pasos para agendar su cita.
        </p>

        {/* --- Renderizado Condicional Basado en currentView --- */}

        {currentView === FLUJO_VISTAS.INICIO_SELECT_STEP && (
          <>
            <SelectStep onSelectChange={handleInitialSelectChange} />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
              disabledSiguiente={isSiguienteDisabled()} // Usa la función para deshabilitar
            />
          </>
        )}

        {currentView === FLUJO_VISTAS.FORMULARIO_ACUDIENTE && (
          <>
            <FormAcudiente
              onChange={handleAcudienteChange}
              onValidatedSubmit={handleAcudienteValidatedSubmit}
              data={acudienteData || {}}
            />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </>
        )}

        {currentView === FLUJO_VISTAS.FORMULARIO_DEPENDIENTE && (
          <>
            <FormDependiente
              onChange={handleDependienteChange}
              onValidatedSubmit={handleDependienteValidatedSubmit}
              data={dependienteData || {}}
            />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </>
        )}

        {currentView === FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Primer Detalle - Selecciona una opción
            </h2>
            <SelectStep />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </DetailsAgendar>
        )}

        {currentView === FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Segundo Detalle - Otra selección
            </h2>
            {/* Pasamos el manejador de cambio para el segundo SelectStep */}
            <SelectStep onSelectChange={handleSecondSelectChange} />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
              disabledSiguiente={isSiguienteDisabled()} // Usa la función para deshabilitar
            />
          </DetailsAgendar>
        )}

        {/* <-- Nuevo: Tercer SelectStep */}
        {currentView === FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Tercer Detalle - Opción Condicional
            </h2>
            <p>Has seleccionado "Primera Opción" en el segundo detalle.</p>
            <SelectStep />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </DetailsAgendar>
        )}

        {/* <-- Nuevo: Cuarto SelectStep */}
        {currentView === FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Cuarto Detalle - Final de Selecciones
            </h2>
            <p>Continuamos con las últimas selecciones de detalle.</p>
            <SelectStep />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </DetailsAgendar>
        )}

        {currentView === FLUJO_VISTAS.FINAL_VERIFICAR && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Verifica tu información
            </h2>
            <div className="resumen-datos">
              <h3>Datos del Acudiente:</h3>
              <pre>{JSON.stringify(acudienteData, null, 2)}</pre>
              <h3>Datos del Dependiente:</h3>
              <pre>{JSON.stringify(dependienteData, null, 2)}</pre>
            </div>
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </DetailsAgendar>
        )}

        {currentView === FLUJO_VISTAS.FINAL_AGENDAR && (
          <DetailsAgendar>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Confirmación de Agendamiento
            </h2>
            <p style={{ textAlign: "center", fontSize: "1.1em" }}>
              ¡Tu cita ha sido agendada con éxito!
            </p>
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
            />
          </DetailsAgendar>
        )}
      </div>
    </Home>
  );
}

export default Agendar;
