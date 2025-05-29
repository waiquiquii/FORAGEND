import React from "react";
import "../../styles/botones-agendar.css";

/**
 * Componente Botones
 * Renderiza un conjunto de botones basado en los nombres proporcionados y las funciones de manejo.
 *
 * @param {object} props - Las props del componente.
 * @param {Array<string>} modoBoton - Un array de strings con los nombres de los botones a renderizar (ej. ["siguiente", "atras"]).
 * @param {object} handleFunctions - Un objeto que contiene las funciones de manejo para cada botón (ej. { handleSiguiente: () => {}, handleAtras: () => {} }).
 * @param {boolean} disabledSiguiente - Opcional. Booleano para deshabilitar el botón "Siguiente".
 */

const Botones = ({ modoBoton, handleFunctions, disabledSiguiente }) => {
  // Define la estructura de los botones.
  // Las funciones onClick se obtienen de handleFunctions.
  const botonesConfig = {
    siguiente: (
      <button
        key="siguiente"
        onClick={handleFunctions.handleSiguiente}
        className={`agendar__boton agendar__boton--siguiente ${
          disabledSiguiente ? "agendar__boton--disabled" : ""
        }`}
        disabled={disabledSiguiente} // Asegura que el atributo 'disabled' se aplique al HTML
      >
        Siguiente
      </button>
    ),
    atras: (
      <button
        key="atras"
        onClick={handleFunctions.handleAtras}
        className="agendar__boton agendar__boton--atras"
      >
        Anterior
      </button>
    ),
    // Cambiamos 'verificar' por 'confirmar' según tu indicación
    confirmar: (
      <button
        key="confirmar"
        onClick={handleFunctions.handleVerificar} // Mantenemos la función existente
        className="agendar__boton agendar__boton--confirmar"
      >
        Confirmar
      </button>
    ),
    agendar: (
      <button
        key="agendar"
        onClick={handleFunctions.handleAgendar}
        className="agendar__boton agendar__boton--agendar"
      >
        Agendar
      </button>
    ),
  };

  return (
    <div className="botones__container">
      {/* Mapea sobre los nombres de los botones en modoBoton y renderiza el botón correspondiente */}
      {modoBoton.map((nombreBoton) => {
        if (botonesConfig[nombreBoton]) {
          return botonesConfig[nombreBoton];
        }
        console.warn(
          `Botón con nombre "${nombreBoton}" no encontrado en la configuración.`
        );
        return null;
      })}
    </div>
  );
};

export default Botones;
