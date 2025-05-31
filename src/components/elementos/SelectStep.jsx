import React, { useState, useEffect } from "react"; // Importa useEffect
import "./../../styles/SelectStep.css";

// Añade la prop initialValue
function SelectStep({ onSelectChange = () => {}, initialValue = "" }) {
  const title = "Selecciona una opción";

  const options = {
    default: "Seleccionar",
    opcion1: "Primera Opción",
    opcion2: "Segunda Opción",
    opcion3: "Tercera Opción",
  };

  const disabledOption = options.default;

  // Inicializa el estado con initialValue o el valor por defecto
  const [selectedValue, setSelectedValue] = useState(
    initialValue || disabledOption
  );

  // Usa useEffect para actualizar selectedValue si initialValue cambia (al navegar hacia atrás/adelante)
  useEffect(() => {
    if (initialValue !== selectedValue) {
      // Evita bucles infinitos
      setSelectedValue(initialValue || disabledOption);
    }
  }, [initialValue]); // Se ejecuta cuando initialValue cambia

  const onChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    onSelectChange(value);
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
        value={selectedValue} // El valor del select ahora está controlado por selectedValue
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
