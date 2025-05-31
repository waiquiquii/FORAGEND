import React, { useState, useEffect } from "react"; // Importa useEffect
import "./../../styles/SelectStep.css";

// Añade la prop initialValue
function SelectHorario({ onSelectChange = () => {}, initialValue = "" }) {
  const title = "selecciona un turno";

  const options = {
    default: "Seleccionar",
    opcion1: "08:00 - 08:30 AM",
    opcion2: "08:30 - 09:00 AM",
    opcion3: "09:00 - 09:30 AM",
    opcion4: "09:30 - 10:00 AM",
    opcion5: "10:00 - 10:30 AM",
    opcion6: "10:30 - 11:00 AM",
    opcion7: "11:00 - 11:30 AM",
    opcion8: "11:30 - 12:00 PM",
    opcion9: "02:00 - 02:30 PM",
    opcion10: "02:30 - 03:00 PM",
    opcion11: "03:00 - 03:30 PM",
    opcion12: "03:30 - 04:00 PM",
    opcion13: "04:00 - 04:30 PM",
    opcion14: "04:30 - 05:00 PM",
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

      {/* {selectedValue !== disabledOption && (
        <p className="paso-seleccion__valor-mostrado">
          Seleccionado: **{selectedValue}**
        </p>
      )} */}
    </div>
  );
}

export default SelectHorario;
