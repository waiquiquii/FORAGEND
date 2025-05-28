import React, { useState, createContext , useContext } from "react";

import Home from "../adapters/Home";
import DetailsAgendar from "../adapters/DetailsAgendar";
import { obtenerPasoComponente } from "../../utils/obtenerPasoComponente";
import { PASOS_AGENDAR, OPCION_DEFAULT } from "../../utils/pasosAgendar";

export const CalendarioContexto = createContext(null);

function Agendar() {

  const [pasos, setPasos] = useState([])

  const [pasoActual, setPasoActual] = useState(PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.id);
  const [valorSolicitante, setValorSolicitante] = useState(OPCION_DEFAULT);
  const [tipoCita, setTipoCita] = useState(OPCION_DEFAULT);
  const [subTipoCita, setSubTipoCita] = useState(OPCION_DEFAULT);
  const [valorHora, setValorHora] = useState(OPCION_DEFAULT);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [seleccionarDetalles, setSeleccionarDetalles] = useState(false);
  const [acudiente, setAcudiente] = useState({
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    parentesco: "",
    tipoDocumento: "cc",
    numeroDocumento: "",
  });
  const [dependiente, setDependiente] = useState({
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    parentesco: "",
    tipoDocumento: "registro",
    numeroDocumento: "",
    fechaNacimiento: "",
    genero: "",
  });

  const handleSolicitanteChange = (e) => setValorSolicitante(e.target.value);
  const handleChangeTipoCita = (e) => setTipoCita(e.target.value);
  const handleChangeSubTipoCita = (e) => setSubTipoCita(e.target.value);
  const handleChangeValorHora = (e) => setValorHora();



  const handleNextStepFromSolicitante = () => {
      if (valorSolicitante !== OPCION_DEFAULT) {
        setPasos([...pasos,Object.keys(PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.id)]);
        if (valorSolicitante !== PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.opciones.PARA_MI) {
          setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE.id)
        } else {
          setSeleccionarDetalles(true);
          setPasoActual(PASOS_AGENDAR.SELECCIONAR_FECHA.id)
        }
      } else {
        alert("Por favor, selecciona un solicitante.");
      }
  };

  const handlePrevStep = () => {
    const currentIndex = pasos.findIndex(key => PASOS_AGENDAR[key].id === pasoActual);
    const prevPaso = PASOS_AGENDAR[keys[currentIndex - 1]];
    if (prevPaso) {
      setPasoActual(prevPaso.id);
    }
  };

  const handleChangeAcudiente = (e) => {
    const { name, value } = e.target;
    setAcudiente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAcudiente = (e) => {
    e.preventDefault();
    console.log("Acudiente guardado:", acudiente);
  };

  const handleChangeDependiente = (e) => {
    const { name, value } = e.target;
    setDependiente((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitDependiente = (e) => {
    e.preventDefault();
    setPasoActual(PASOS_AGENDAR.SELECCIONAR_FECHA.id)
    setPasos([...pasos,Object.keys(PASOS_AGENDAR.AGREGAR_DEPENDIENTE.id)])
  };

  const handleNextStepFromTipoCita = () => {
    if (tipoCita !== OPCION_DEFAULT) {
      if (tipoCita === PASOS_AGENDAR.SELECCIONAR_TIPO_CITA.opciones.GENERAL) {
        setPasoActual(PASOS_AGENDAR.SELECCIONAR_SUB_TIPO_CITA.id);
      } else if (tipoCita === PASOS_AGENDAR.SELECCIONAR_TIPO_CITA.opciones.GENERAL) {
        setPasoActual(PASOS_AGENDAR.CONFIRMAR.id)
    } else {
      alert("Por favor, selecciona un tipo de cita.");
    }}
  }

  const PasoComponente = obtenerPasoComponente(pasoActual, {
    valorSolicitante,
    acudiente,
    dependiente,
    tipoCita,
    subTipoCita,
    valorHora,
    handleSolicitanteChange,
    handleChangeAcudiente,
    handleChangeDependiente,
    handleChangeTipoCita,
    handleChangeSubTipoCita,
    handleNextStep,
    handlePrevStep,
    handleNextStepFromSolicitante,
    handleSubmitAcudiente,
    handleSubmitDependiente,
    handleNextStepFromTipoCita,
    handleNextStepFromSubTipoCita,
    handleNextStepFromValorHora,
  });

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
          {!seleccionarDetalles ? (
            PasoComponente // sin llaves aquí
          ) : (
            <DetailsAgendar
              pasoActual={pasoActual}
            >
              {PasoComponente}
            </DetailsAgendar>
          )}
        </div>
      </CalendarioContexto.Provider>
    </Home>
  );
}

export default Agendar;
