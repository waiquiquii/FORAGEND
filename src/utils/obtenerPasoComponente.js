// utils/obtenerPasoComponente.js
import { PASOS_AGENDAR } from "./pasosAgendar";
import SelectStep from "../components/elementos/SelectStep";
import FormAcudiente from "../components/elementos/FormAcudiente";
import FormDependiente from "../components/elementos/FormDependiente";
// Importa otros formularios según los tengas

export function obtenerPasoComponente(pasoActual, props = {}) {
  const componentes = {
    [PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.id]: (
      <SelectStep
        title={PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.title}
        options={PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.opciones}
        selectedValue={props.valorSolicitante}
        onChange={props.handleSolicitanteChange}
        onNext={props.handleNextStepFromSolicitante}
        pasoActual={pasoActual}
      />
    ),
    [PASOS_AGENDAR.AGREGAR_ACUDIENTE.id]: (
      <FormAcudiente
        data={props.acudiente}
        onChange={props.handleChangeAcudiente}
        onSubmit={props.handleSubmitAcudiente}
      />
    ),
    [PASOS_AGENDAR.AGREGAR_DEPENDIENTE.id]: (
      <FormDependiente
        data={props.dependiente}
        onChange={props.handleChangeDependiente}
        onSubmit={props.handleSubmitDependiente}
      />
    ),
    [PASOS_AGENDAR.SELECCIONAR_TIPO_CITA.id]: (
      <SelectStep
        title={PASOS_AGENDAR.SELECCIONAR_TIPO_CITA.title}
        options={PASOS_AGENDAR.SELECCIONAR_TIPO_CITA.opciones}
        selectedValue={props.tipoCita}
        onChange={props.handleChangeTipoCita}
        onNext={props.handleNextStepFromTipoCita}
        onPrev={props.handlePrevStep}
        pasoActual={pasoActual}
      />
    ),
    [PASOS_AGENDAR.SELECCIONAR_SUB_TIPO_CITA.id]: (
      <SelectStep
        title={PASOS_AGENDAR.SELECCIONAR_SUB_TIPO_CITA.title}
        options={PASOS_AGENDAR.SELECCIONAR_SUB_TIPO_CITA.opciones}
        selectedValue={props.subTipoCita}
        onChange={props.handleChangeSubTipoCita}
        onNext={props.handleNextStepFromSubTipoCita}
        onPrev={props.handlePrevStep}
        pasoActual={pasoActual}
      />
    ),
    [PASOS_AGENDAR.SELECCIONAR_HORA.id]: (
      <SelectStep
      title={PASOS_AGENDAR.SELECCIONAR_HORA.title}
        onChange={props.handleChangeHora}
        options={PASOS_AGENDAR.SELECCIONAR_HORA.opciones}
        selectedValue={props.valorHora}
        onNext={props.handleNextStepFromValorHora}
        onPrev={props.handlePrevStep}
        pasoActual={pasoActual}
      />
    ),
    [PASOS_AGENDAR.CONFIRMAR.id]: (
      <></>
    ),
    // Agrega más según necesites
  };

  return componentes[pasoActual] || <div>Paso no definido</div>;
}
