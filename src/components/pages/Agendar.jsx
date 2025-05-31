import React, { useState } from "react";

// Asegúrate de que las rutas a tus componentes sean correctas
import Home from "../adapters/Home";
import DetailsAgendar from "../adapters/DetailsAgendar";
import FormAcudiente from "../elementos/FormAcudiente";
import FormDependiente from "../elementos/FormDependiente";
import SelectStep from "../elementos/SelectStep";
import Botones from "../elementos/Botones";

// Componentes específicos de la página
import SelectDestinatario from "../registro-citas/SelectDestinatario";
import SelectTipoCita from "../registro-citas/SelectTipoCita";
import SelectSubTipoCita from "../registro-citas/SelectSubTipoCita";
import SelectHorario from "../registro-citas/SelectHorario";

// Importamos el CSS para este componente
import "../../styles/agendar.css";

// Definimos los "estados" o "vistas" de nuestro flujo
const FLUJO_VISTAS = {
  PACIENTE_SELECT: "paciente_select",
  FORMULARIO_ACUDIENTE: "formulario_acudiente",
  FORMULARIO_DEPENDIENTE: "formulario_dependiente",
  PRIMER_DETALLE_SELECT_STEP: "10025asr",
  TIPO_CITA_SELECT: "tipo_cita_select",
  SUB_TIPO_CITA_SELECT: "sub_tipo_cita_select",
  HORA_SELECT: "hora_select",
  FINAL_VERIFICAR: "final_verificar",
  FINAL_AGENDAR: "final_agendar",
};

function Agendar() {
  const [currentView, setCurrentView] = useState(FLUJO_VISTAS.PACIENTE_SELECT);
  const [acudienteData, setAcudienteData] = useState(null);
  const [dependienteData, setDependienteData] = useState(null);

  // --- NUEVO ESTADO: Objeto para guardar todas las selecciones de SelectStep ---
  const [selectOptions, setSelectOptions] = useState({
    forWhomCita: "",
    firstDetailSelect: "",
    tipoCitaSelect: "",
    subTipoCitaSelect: "",
    horaSelect: "",
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
      case FLUJO_VISTAS.PACIENTE_SELECT:
        if (selectOptions.forWhomCita === "Para mi (menor de edad)") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (selectOptions.forWhomCita === "Para otra persona") {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else if (selectOptions.forWhomCita === "Para mi") {
          setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
        } else {
          // Esto ya no debería ocurrir si el botón está deshabilitado
          alert("Por favor, selecciona una opción válida para continuar.");
        }
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        setCurrentView(FLUJO_VISTAS.TIPO_CITA_SELECT);
        break;
      case FLUJO_VISTAS.TIPO_CITA_SELECT:
        if (selectOptions.tipoCitaSelect === "Consulta de especialidad") {
          setCurrentView(FLUJO_VISTAS.SUB_TIPO_CITA_SELECT);
        } else {
          setCurrentView(FLUJO_VISTAS.HORA_SELECT);
        }
        break;
      case FLUJO_VISTAS.SUB_TIPO_CITA_SELECT:
        setCurrentView(FLUJO_VISTAS.HORA_SELECT);
        break;
      case FLUJO_VISTAS.HORA_SELECT:
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
        setCurrentView(FLUJO_VISTAS.PACIENTE_SELECT);
        break;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        if (acudienteData) {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_ACUDIENTE);
        } else if (dependienteData) {
          setCurrentView(FLUJO_VISTAS.FORMULARIO_DEPENDIENTE);
        } else {
          setCurrentView(FLUJO_VISTAS.PACIENTE_SELECT);
        }
        break;
      case FLUJO_VISTAS.TIPO_CITA_SELECT:
        setCurrentView(FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP);
        break;
      case FLUJO_VISTAS.SUB_TIPO_CITA_SELECT:
        setCurrentView(FLUJO_VISTAS.TIPO_CITA_SELECT);
        break;
      case FLUJO_VISTAS.HORA_SELECT:
        if (selectOptions.tipoCitaSelect === "Consulta de especialidad") {
          setCurrentView(FLUJO_VISTAS.SUB_TIPO_CITA_SELECT);
        } else {
          setCurrentView(FLUJO_VISTAS.TIPO_CITA_SELECT);
        }
        break;
      case FLUJO_VISTAS.FINAL_VERIFICAR:
        setCurrentView(FLUJO_VISTAS.HORA_SELECT);
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
      forWhomCita: "",
      firstDetailSelect: "",
      tipoCitaSelect: "",
      subTipoCitaSelect: "",
      horaSelect: "",
    });
    setCurrentView(FLUJO_VISTAS.PACIENTE_SELECT);
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
    case FLUJO_VISTAS.PACIENTE_SELECT:
      modoActualBotones = ["siguiente"];
      break;
    case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
    case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
      modoActualBotones = ["atras"];
      break;
    case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.TIPO_CITA_SELECT:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.SUB_TIPO_CITA_SELECT:
      modoActualBotones = ["atras", "siguiente"];
      break;
    case FLUJO_VISTAS.HORA_SELECT:
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
      case FLUJO_VISTAS.PACIENTE_SELECT:
        return isOptionInvalid(selectOptions.forWhomCita);
      case FLUJO_VISTAS.FORMULARIO_ACUDIENTE:
      case FLUJO_VISTAS.FORMULARIO_DEPENDIENTE:
        return false;
      case FLUJO_VISTAS.PRIMER_DETALLE_SELECT_STEP:
        return isOptionInvalid(selectOptions.firstDetailSelect);
      case FLUJO_VISTAS.TIPO_CITA_SELECT:
        return isOptionInvalid(selectOptions.tipoCitaSelect);
      case FLUJO_VISTAS.SUB_TIPO_CITA_SELECT:
        return isOptionInvalid(selectOptions.subTipoCitaSelect);
      case FLUJO_VISTAS.HORA_SELECT:
        return isOptionInvalid(selectOptions.horaSelect);
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
          {currentView === FLUJO_VISTAS.PACIENTE_SELECT && (
            <div className="agendar-contenedor__paso">
              <SelectDestinatario
                onSelectChange={(value) =>
                  handleSelectChange("forWhomCita", value)
                }
                initialValue={selectOptions.forWhomCita} // Pasar el valor para precargar
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

          {currentView === FLUJO_VISTAS.TIPO_CITA_SELECT && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  ¿Qué tipo de cita deseas agendar?
                </h2>
                <SelectTipoCita
                  onSelectChange={(value) =>
                    handleSelectChange("tipoCitaSelect", value)
                  }
                  initialValue={selectOptions.tipoCitaSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.SUB_TIPO_CITA_SELECT && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Selecciona una especialidad médica
                </h2>
                <SelectSubTipoCita
                  onSelectChange={(value) =>
                    handleSelectChange("subTipoCitaSelect", value)
                  }
                  initialValue={selectOptions.subTipoCitaSelect} // Pasar el valor para precargar
                />
              </DetailsAgendar>
            </div>
          )}

          {currentView === FLUJO_VISTAS.HORA_SELECT && (
            <div className="agendar-contenedor__paso">
              <DetailsAgendar>
                <h2 className="agendar-contenedor__titulo-detalle">
                  Selecciona una hora para tu cita
                </h2>
                {/* <p className="agendar-contenedor__texto-informativo">
                  Continuamos con las últimas selecciones de detalle.
                </p> */}
                <SelectHorario
                  onSelectChange={(value) =>
                    handleSelectChange("horaSelect", value)
                  }
                  initialValue={selectOptions.horaSelect} // Pasar el valor para precargar
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
