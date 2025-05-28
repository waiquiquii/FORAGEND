import React from "react";

// Puedes definir los botones afuera del componente
const botones = (handleNextStep, handlePrevStep) => ({
  siguiente: (
    <button onClick={handleNextStep} className="agendar__boton--siguiente">
      Siguiente
    </button>
  ),
  atras: (
    <button onClick={handlePrevStep} className="agendar__boton--anterior">
      Anterior
    </button>
  ),
  verificar: (
    <button onClick={handleNextStep} className="agendar__boton--verificar">
      Verificar
    </button>
  ),
  agendar: (
    <button onClick={handleNextStep} className="agendar__boton--agendar">
      Agendar
    </button>
  ),
});

// Esta función renderiza los botones según el paso actual
function renderizarBotones(pasoActual, PASOS_AGENDAR, handleNextStep, handlePrevStep) {
  const b = botones(handleNextStep, handlePrevStep);
  if (pasoActual === PASOS_AGENDAR.SELECCIONAR_SOLICITANTE.id) {
    return <>{b.siguiente}</>;
  } else if (pasoActual === PASOS_AGENDAR.SELECCIONAR_HORA.id) {
    return (
      <>
        {b.atras}
        {b.siguiente}
      </>
    );
  } else if (pasoActual === PASOS_AGENDAR.CONFIRMAR.id) {
    return (
      <>
        {b.atras}
        {b.verificar}
      </>
    );
  } else {
    return <>{b.agendar}</>;
  }
}

function SelectStep({
  title,
  options,
  selectedValue,
  onChange,
  onNext,
  onPrev,
  pasoActual,
  PASOS_AGENDAR,
  disabledOption = "seleccionar",
}) {
  return (
    <div className="agendar-persona">
      <label htmlFor="select-step" className="step-label">
        {title}
      </label>
      <select
        id="select-step"
        className="select__opcion"
        onChange={onChange}
        value={selectedValue}
      >
        {Object.values(options).map((option) => (
          <option
            key={option}
            value={option}
            disabled={option === disabledOption}
            className="select__opcion"
          >
            {option}
          </option>
        ))}
      </select>

      <div className="botones__container">
        {renderizarBotones(pasoActual, PASOS_AGENDAR, onNext, onPrev)}
      </div>
    </div>
  );
}

export default SelectStep;

