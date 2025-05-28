import React, { useState, useEffect } from "react";

const opcionesParentesco = [
  { value: "hijo", label: "Hijo/a" },
  { value: "nieto", label: "Nieto/a" },
  { value: "sobrino", label: "Sobrino/a" },
  { value: "otro", label: "Otro" },
];

const opcionesTipoId = [
  { value: "registro", label: "Registro civil" },
  { value: "ti", label: "Tarjeta de identidad" },
  { value: "cc", label: "Cédula de ciudadanía" },
  { value: "ppt", label: "Permiso por protección temporal" },
];

const opcionesGenero = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro / Prefiero no decir" },
];

function FormDependiente({
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
    tipoIdentificacion: data.tipoIdentificacion || "",
    numeroIdentificacion: data.numeroIdentificacion || "",
    fechaNacimiento: data.fechaNacimiento || "",
    genero: data.genero || "",
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
    <form onSubmit={handleSubmit} className="form-dependiente">
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
          <option value="" disabled>Seleccione tipo de documento</option>
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

      <label>
        Fecha de nacimiento:
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          disabled={disabled}
          required
        />
      </label>

      <label>
        Género:
        <select
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          disabled={disabled}
          required
        >
          <option value="" disabled>Seleccione género</option>
          {opcionesGenero.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={disabled}>
        Guardar Dependiente
      </button>
    </form>
  );
}

export default FormDependiente;
