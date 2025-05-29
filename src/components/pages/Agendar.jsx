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
  INICIO_SELECT_STEP: "inicio_select_step", // Primera vista con el SelectStep inicial
  FORMULARIO_ACUDIENTE: "formulario_acudiente", // Vista para el formulario de Acudiente
  FORMULARIO_DEPENDIENTE: "formulario_dependiente", // Vista para el formulario de Dependiente
  PRIMER_DETALLE_SELECT_STEP: "primer_detalle_select_step", // El primer SelectStep envuelto en DetailsAgendar
  SEGUNDO_DETALLE_SELECT_STEP: "segundo_detalle_select_step", // El segundo SelectStep envuelto en DetailsAgendar
  FINAL_VERIFICAR: "final_verificar", // Un paso para verificar (ej. resumen)
  FINAL_AGENDAR: "final_agendar", // Paso final de agendamiento
};

function Agendar() {
  const [currentView, setCurrentView] = useState(
    FLUJO_VISTAS.INICIO_SELECT_STEP
  );
  const [acudienteData, setAcudienteData] = useState(null);
  const [dependienteData, setDependienteData] = useState(null);
  const [initialSelectedOption, setInitialSelectedOption] = useState(""); // Para guardar la opción del primer SelectStep
  const [detailsStep, setDetailsStep] = useState(0); // Para controlar los SelectStep dentro de DetailsAgendar

  // --- Manejadores de Formularios ---
  // Se llaman después de que FormAcudiente pasa sus validaciones
  const handleAcudienteValidatedSubmit = (data) => {
    console.log("Datos del Acudiente validados:", data);
    setAcudienteData(data); // Guarda los datos del acudiente
    // Después de enviar acudiente, pasamos al primer SelectStep dentro de DetailsAgendar
    setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
    setDetailsStep(0); // Reinicia el paso para los detalles
  };

  // Se llaman después de que FormDependiente pasa sus validaciones
  const handleDependienteValidatedSubmit = (data) => {
    console.log("Datos del Dependiente validados:", data);
    setDependienteData(data); // Guarda los datos del dependiente
    // Después de enviar dependiente, pasamos al primer SelectStep dentro de DetailsAgendar
    setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
    setDetailsStep(0); // Reinicia el paso para los detalles
  };

  // Manejadores de cambio (para obtener datos en tiempo real si es necesario)
  const handleAcudienteChange = (data) => {
    // console.log("Acudiente data en tiempo real:", data);
  };
  const handleDependienteChange = (data) => {
    // console.log("Dependiente data en tiempo real:", data);
  };

  // Manejador del SelectStep inicial (para decidir qué formulario mostrar)
  const handleInitialSelectChange = (value) => {
    setInitialSelectedOption(value); // Guarda la opción seleccionada
    // Puedes agregar lógica aquí si necesitas hacer algo inmediatamente al seleccionar
    console.log("Opción inicial seleccionada:", value);
  };

  // --- Manejadores de Navegación (para el componente Botones) ---
  const handleSiguiente = () => {
    switch (currentView) {
      case FLUJO_VISTAS.INICIO_SELECT_STEP:
        // Decidimos a qué formulario ir según la opción seleccionada
        if (initialSelectedOption === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (initialSelectedOption === "Segunda Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          // Si no se ha seleccionado nada o es una opción no manejada
          alert("Por favor, selecciona una opción válida para continuar.");
        }
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
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
        // Volver al formulario que se mostró anteriormente
        if (acudienteData) {
          // Si ya tenemos datos de acudiente, significa que venimos de allí
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (dependienteData) {
          // Si tenemos datos de dependiente, venimos de allí
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          // Si por alguna razón no tenemos datos (ej. recarga de página), volver al inicio
          setCurrentView(FLUJO_VISTAS.INICIO_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.FINAL_VERIFICAR:
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
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
    // Aquí iría la lógica final de envío de datos combinados (acudienteData, dependienteData, etc.)
    setAcudienteData(null);
    setDependienteData(null);
    setInitialSelectedOption("");
    setDetailsStep(0);
    setCurrentView(FLUJO_VISTAS.INICIO_SELECT_STEP); // Volver al inicio
  };

  // --- Objeto que agrupa todas las funciones de manejo para Botones ---
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
      // El botón "Siguiente" aquí depende de si una opción válida ha sido seleccionada
      modoActualBotones = ["siguiente"];
      break;
    case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
    case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
      // Los formularios tienen su propio botón de submit ("Guardar Acudiente" o "Guardar Dependiente")
      // que maneja el avance. Aquí solo ofrecemos "Atrás".
      modoActualBotones = ["atras"];
      break;
    case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
    case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
      modoActualBotones = ["atras", "siguiente"];
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
            {/* Aquí pasamos el handler de cambio al SelectStep inicial */}
            <SelectStep onSelectChange={handleInitialSelectChange} />
            <Botones
              modoBoton={modoActualBotones}
              handleFunctions={allHandleFunctionsBotons}
              // Deshabilita el botón "Siguiente" si no hay una opción válida seleccionada
              // o si es la opción por defecto. Ajusta la lógica de SelectStep para exponer `disabledOption`.
              // Asumiendo que "Seleccionar" es el valor por defecto/deshabilitado
              disabledSiguiente={
                initialSelectedOption === "Seleccionar" ||
                !initialSelectedOption
              }
            />
          </>
        )}

        {currentView === FLUJO_VISTAS.FORMULARIO_ACUDIENTE && (
          <>
            <FormAcudiente
              onChange={handleAcudienteChange}
              onValidatedSubmit={handleAcudienteValidatedSubmit}
              data={acudienteData || {}} // Pasar datos si existen para pre-llenar/editar
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
              data={dependienteData || {}} // Pasar datos si existen para pre-llenar/editar
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
            <SelectStep />{" "}
            {/* Este SelectStep ahora es parte de la secuencia de detalles */}
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
            <SelectStep />{" "}
            {/* Un segundo SelectStep en la secuencia de detalles */}
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
