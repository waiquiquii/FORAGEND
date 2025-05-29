import React, { useState } from "react";
import "./../../styles/SelectStep.css"; // Asegúrate de que esta ruta sea correcta

function SelectStep({ onSelectChange = () => {} }) {
  // <-- Añade la prop onSelectChange
  const title = "Selecciona una opción";

  const options = {
    default: "Seleccionar",
    opcion1: "Primera Opción",
    opcion2: "Segunda Opción",
    opcion3: "Tercera Opción",
  };

  const disabledOption = options.default;

  const [selectedValue, setSelectedValue] = useState(disabledOption);

  // Handler de cambio local para el dropdown
  const onChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelectChange(value); // <-- Llama a la función padre con el valor seleccionado
    console.log("Opción seleccionada localmente:", value);
  };

  return (
    <div className="paso-seleccion">
      <label htmlFor="select-step" className="paso-seleccion__etiqueta">
        {title}
      </label>
      <select
        id="select-step"
        className="paso-seleccion__selector"
        onChange={onChange}
        value={selectedValue}
      >
        {Object.values(options).map((option) => (
          <option
            key={option}
            value={option}
            disabled={option === disabledOption}
            className="paso-seleccion__opcion"
          >
            {option}
          </option>
        ))}
      </select>

      {selectedValue !== disabledOption && (
        <p className="paso-seleccion__valor-mostrado">
          Seleccionado: **{selectedValue}**
        </p>
      )}
    </div>
  );
}

export default SelectStep;
