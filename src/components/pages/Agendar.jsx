import React, { useState } from "react";

// Asegúrate de que las rutas a tus componentes sean correctas
import Home from "../adapters/Home";
import DetailsAgendar from "../adapters/DetailsAgendar";
import FormAcudiente from "../elementos/FormAcudiente";
import FormDependiente from "../elementos/FormDependiente";
import SelectStep from "../elementos/SelectStep";
import Botones from "../elementos/Botones";

// Importamos el CSS para este componente
import "../../styles/agendar.css";

// Definimos los "estados" o "vistas" de nuestro flujo
const FLUJO_VISTAS = {
  INICIO_SELECT_STEP: "inicio_select_step",
  FORMULARIO_ACUDIENTE: "formulario_acudiente",
  FORMULARIO_DEPENDIENTE: "formulario_dependiente",
  PRIMER_DETALLE_SELECT_STEP: "primer_detalle_select_step",
  SEGUNDO_DETALLE_SELECT_STEP: "segundo_detalle_select_step",
  TERCER_DETALLE_SELECT_STEP: "tercer_detalle_select_step",
  CUARTO_DETALLE_SELECT_STEP: "cuarto_detalle_select_step",
  FINAL_VERIFICAR: "final_verificar",
  FINAL_AGENDAR: "final_agendar",
};

function Agendar() {
  const [currentView, setCurrentView] = useState(
    FLUJO_VISTAS.INICIO_SELECT_STEP
  );
  const [acudienteData, setAcudienteData] = useState(null);
  const [dependienteData, setDependienteData] = useState(null);

  // --- NUEVO ESTADO: Objeto para guardar todas las selecciones de SelectStep ---
  const [selectOptions, setSelectOptions] = useState({
    initialSelect: "",
    firstDetailSelect: "",
    secondSelect: "",
    thirdSelect: "",
    fourthSelect: "",
  });

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

  // --- Manejador genérico para todas las selecciones de SelectStep ---
  const handleSelectChange = (key, value) => {
    setSelectOptions((prevOptions) => ({
      ...prevOptions,
      [key]: value,
    }));
    console.log(`Opción ${key} seleccionada:`, value);
  };

  // --- Manejadores de Navegación (para el componente Botones) ---
  const handleSiguiente = () => {
    switch (currentView) {
      case FLUJO_VISTAS.INICIO_SELECT_STEP:
        if (selectOptions.initialSelect === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (selectOptions.initialSelect === "Segunda Opción") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          // Esto ya no debería ocurrir si el botón está deshabilitado
          alert("Por favor, selecciona una opción válida para continuar.");
        }
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
        if (selectOptions.secondSelect === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP);
        } else {
          setCurrentView(FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP:
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
      case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP:
        if (selectOptions.secondSelect === "Primera Opción") {
          setCurrentView(FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP);
        } else {
          setCurrentView(FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP);
        }
        break;
      case FLUJO_VISTAS.FINAL_VERIFICAR:
        setCurrentView(FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP);
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
    // Limpiar todos los estados al agendar
    setAcudienteData(null);
    setDependienteData(null);
    setSelectOptions({
      // Resetear todas las selecciones
      initialSelect: "",
      firstDetailSelect: "",
      secondSelect: "",
      thirdSelect: "",
      fourthSelect: "",
    });
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
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.FINAL_VERIFICAR:
      modoActualBotones = ["atras", "confirmar"];
      break;
    case FLUJO_VISTAS.FINAL_AGENDAR:
      modoActualBotones = ["agendar"];
      break;
    default:
      modoActualBotones = [];
      break;
  }

  // Lógica para deshabilitar el botón "Siguiente" condicionalmente
  const isOptionInvalid = (option) => option === "Seleccionar" || !option;

  const isSiguienteDisabled = () => {
    switch (currentView) {
      case FLUJO_VISTAS.INICIO_SELECT_STEP:
        return isOptionInvalid(selectOptions.initialSelect);
      case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
      case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
        return false;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        return isOptionInvalid(selectOptions.firstDetailSelect);
      case FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP:
        return isOptionInvalid(selectOptions.secondSelect);
      case FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP:
        return isOptionInvalid(selectOptions.thirdSelect);
      case FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP:
        return isOptionInvalid(selectOptions.fourthSelect);
      default:
        return false;
    }
  };

  return (
    <Home>
      <div className="agendar-contenedor">
        <h1 className="agendar-contenedor__titulo">Agendar Cita Médica</h1>
        <p className="agendar-contenedor__descripcion">
          Por favor, complete los siguientes pasos para agendar su cita.
        </p>

        <div className="main-content__contenido-scrollable">
          {currentView === FLUJO_VISTAS.INICIO_SELECT_STEP && (
            <div className="agendar-contenedor__paso">
              <SelectStep
                onSelectChange={(value) =>
                  handleSelectChange("initialSelect", value)
                }
                initialValue={selectOptions.initialSelect} // Pasar el valor para precargar
              />
            </div>
          )}

          {currentView === FLUJO_VISTAS.FORMULARIO_ACUDIENTE && (
            <div className="agendar-contenedor__paso">
              <FormAcudiente
                onChange={handleAcudienteChange}
                onValidatedSubmit={handleAcudienteValidatedSubmit}
                data={acudienteData || {}}
              />
            </div>
          )}

          {currentView === FLUJO_VISTAS.FORMULARIO_DEPENDIENTE && (
            <div className="agendar-contenedor__paso">
              <FormDependiente
                onChange={handleDependienteChange}
                onValidatedSubmit={handleDependienteValidatedSubmit}
                data={dependienteData || {}}
              />
            </div>
          )}

          {currentView === FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Primer Detalle - Selecciona una opción
                </h2>
                <SelectStep
                  onSelectChange={(value) =>
                    handleSelectChange("firstDetailSelect", value)
                  }
                  initialValue={selectOptions.firstDetailSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.SEGUNDO_DETALLE_SELECT_STEP && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Segundo Detalle - Otra selección
                </h2>
                <SelectStep
                  onSelectChange={(value) =>
                    handleSelectChange("secondSelect", value)
                  }
                  initialValue={selectOptions.secondSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.TERCER_DETALLE_SELECT_STEP && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Tercer Detalle - Opción Condicional
                </h2>
                <p className="agendar-contenedor__texto-informativo">
                  Has seleccionado "Primera Opción" en el segundo detalle.
                </p>
                <SelectStep
                  onSelectChange={(value) =>
                    handleSelectChange("thirdSelect", value)
                  }
                  initialValue={selectOptions.thirdSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.CUARTO_DETALLE_SELECT_STEP && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Cuarto Detalle - Final de Selecciones
                </h2>
                <p className="agendar-contenedor__texto-informativo">
                  Continuamos con las últimas selecciones de detalle.
                </p>
                <SelectStep
                  onSelectChange={(value) =>
                    handleSelectChange("fourthSelect", value)
                  }
                  initialValue={selectOptions.fourthSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.FINAL_VERIFICAR && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Verifica tu información
                </h2>
                <div className="agendar-contenedor__resumen-datos">
                  <h3 className="agendar-contenedor__subtitulo-resumen">
                    Datos del Acudiente:
                  </h3>
                  <pre className="agendar-contenedor__preformato-datos">
                    {JSON.stringify(acudienteData, null, 2)}
                  </pre>
                  <h3 className="agendar-contenedor__subtitulo-resumen">
                    Datos del Dependiente:
                  </h3>
                  <pre className="agendar-contenedor__preformato-datos">
                    {JSON.stringify(dependienteData, null, 2)}
                  </pre>
                  <h3 className="agendar-contenedor__subtitulo-resumen">
                    Selecciones:
                  </h3>
                  <pre className="agendar-contenedor__preformato-datos">
                    {JSON.stringify(selectOptions, null, 2)}
                  </pre>
                </div>
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.FINAL_AGENDAR && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Confirmación de Agendamiento
                </h2>
                <p className="agendar-contenedor__texto-confirmacion">
                  ¡Tu cita ha sido agendada con éxito!
                </p>
              </DetailsAgendar>
            </div>
          )}
        </div>

        <Botones
          modoBoton={modoActualBotones}
          handleFunctions={allHandleFunctionsBotons}
          disabledSiguiente={isSiguienteDisabled()}
        />
      </div>
    </Home>
  );
}

export default Agendar;
