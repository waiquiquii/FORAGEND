import React from "react";
// Asegúrate de que los estilos de los botones estén accesibles.
// Podrían importarse aquí si son específicos de los botones,
// o asumirse que se importan en un nivel superior (ej. en Agendar.jsx).
import "../../styles/Agendar.css"; // Si los estilos de botones están aquí

/**
 * Componente Botones
 * Renderiza un conjunto de botones basado en los nombres proporcionados y las funciones de manejo.
 *
 * @param {object} props - Las props del componente.
 * @param {Array<string>} modoBoton - Un array de strings con los nombres de los botones a renderizar (ej. ["siguiente", "atras"]).
 * @param {object} handleFunctions - Un objeto que contiene las funciones de manejo para cada botón (ej. { handleSiguiente: () => {}, handleAtras: () => {} }).
 */
const Botones = ({ modoBoton, handleFunctions }) => {
  // Define la estructura de los botones.
  // Las funciones onClick se obtienen de handleFunctions.
  const botonesConfig = {
    siguiente: (
      <button
        key="siguiente"
        onClick={handleFunctions.handleSiguiente}
        className="agendar__boton--siguiente"
      >
        Siguiente
      </button>
    ),
    atras: (
      <button
        key="atras"
        onClick={handleFunctions.handleAtras}
        className="agendar__boton--anterior"
      >
        Anterior
      </button>
    ),
    verificar: (
      <button
        key="verificar"
        onClick={handleFunctions.handleVerificar}
        className="agendar__boton--verificar"
      >
        Verificar
      </button>
    ),
    agendar: (
      <button
        key="agendar"
        onClick={handleFunctions.handleAgendar}
        className="agendar__boton--agendar"
      >
        Agendar
      </button>
    ),
  };

  return (
    <div className="botones__container">
      {/* Mapea sobre los nombres de los botones en modoBoton y renderiza el botón correspondiente */}
      {modoBoton.map((nombreBoton) => {
        // Asegúrate de que el botón exista en la configuración antes de intentar renderizarlo
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
