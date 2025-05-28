import React, { useState, useEffect } from "react";

const opcionesParentesco = [
  { value: "padre", label: "Padre" },
  { value: "madre", label: "Madre" },
  { value: "hermano", label: "Hermano" },
  { value: "tio", label: "Tío" },
  { value: "abuelo", label: "Abuelo/a" },
];

const opcionesTipoId = [
  { value: "cc", label: "Cédula de ciudadanía" },
  { value: "pasaporte", label: "Pasaporte" },
];

function FormAcudiente({
  data = {},
  onChange = () => {},
  onSubmit = () => {},
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    nombres: data.nombres || "",
    primerApellido: data.primerApellido || "",
    segundoApellido: data.segundoApellido || "",
    parentesco: data.parentesco || "",
    tipoIdentificacion: data.tipoIdentificacion || "cc",
    numeroIdentificacion: data.numeroIdentificacion || "",
  });

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-acudiente">
      <fieldset>
        <legend>Nombre completo</legend>
        <label>
          Nombres:
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </label>
        <label>
          Primer apellido:
          <input
            type="text"
            name="primerApellido"
            value={formData.primerApellido}
            onChange={handleChange}
            disabled={disabled}
            required
          />
        </label>
        <label>
          Segundo apellido:
          <input
            type="text"
            name="segundoApellido"
            value={formData.segundoApellido}
            onChange={handleChange}
            disabled={disabled}
          />
        </label>
      </fieldset>

      <label>
        Parentesco:
        <select
          name="parentesco"
          value={formData.parentesco}
          onChange={handleChange}
          disabled={disabled}
          required
        >
          <option value="" disabled>Seleccione parentesco</option>
          {opcionesParentesco.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <label>
        Tipo de identificación:
        <select
          name="tipoIdentificacion"
          value={formData.tipoIdentificacion}
          onChange={handleChange}
          disabled={disabled}
          required
        >
          {opcionesTipoId.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <label>
        Número de identificación:
        <input
          type="number"
          name="numeroIdentificacion"
          value={formData.numeroIdentificacion}
          onChange={handleChange}
          disabled={disabled}
          required
          min={1}
        />
      </label>

      <button type="submit" disabled={disabled}>
        Guardar Acudiente
      </button>
    </form>
  );
}

export default FormAcudiente;

