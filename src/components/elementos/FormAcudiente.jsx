import React, { useEffect } from "react";
import useForm from "../../hooks/useForm"; // Ruta al hook useForm
import acudienteValidations from "../../formConfigs/acudienteValidations"; // ¡Importa las validaciones!
import "../../styles/FormAcudiente.css"; // ¡Importa los estilos específicos!

// Opciones para los select
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
  onValidatedSubmit = () => {},
  disabled = false,
}) {
  const initialFormState = {
    nombres: data.nombres || "",
    primerApellido: data.primerApellido || "",
    segundoApellido: data.segundoApellido || "",
    parentesco: data.parentesco || "",
    tipoIdentificacion: data.tipoIdentificacion || "cc",
    numeroIdentificacion: data.numeroIdentificacion || "",
  };

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  } = useForm(initialFormState, acudienteValidations, onValidatedSubmit);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  return (
    <form onSubmit={handleSubmit} className="formulario-acudiente">
      <h3 className="formulario-acudiente__titulo">Datos del Acudiente</h3>
      <fieldset className="formulario-acudiente__grupo-campos">
        <legend className="formulario-acudiente__leyenda">
          Nombre completo
        </legend>

        <div className="formulario-acudiente__campo">
          <label htmlFor="nombres" className="formulario-acudiente__etiqueta">
            Nombres:
          </label>
          <input
            id="nombres"
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`formulario-acudiente__entrada ${
              errors.nombres ? "formulario-acudiente__entrada--error" : ""
            }`}
          />
          {errors.nombres && (
            <p className="formulario-acudiente__mensaje-error">
              {errors.nombres}
            </p>
          )}
        </div>

        <div className="formulario-acudiente__campo">
          <label
            htmlFor="primerApellido"
            className="formulario-acudiente__etiqueta"
          >
            Primer apellido:
          </label>
          <input
            id="primerApellido"
            type="text"
            name="primerApellido"
            value={formData.primerApellido}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`formulario-acudiente__entrada ${
              errors.primerApellido
                ? "formulario-acudiente__entrada--error"
                : ""
            }`}
          />
          {errors.primerApellido && (
            <p className="formulario-acudiente__mensaje-error">
              {errors.primerApellido}
            </p>
          )}
        </div>

        <div className="formulario-acudiente__campo">
          <label
            htmlFor="segundoApellido"
            className="formulario-acudiente__etiqueta"
          >
            Segundo apellido:
          </label>
          <input
            id="segundoApellido"
            type="text"
            name="segundoApellido"
            value={formData.segundoApellido}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={`formulario-acudiente__entrada ${
              errors.segundoApellido
                ? "formulario-acudiente__entrada--error"
                : ""
            }`}
          />
          {errors.segundoApellido && (
            <p className="formulario-acudiente__mensaje-error">
              {errors.segundoApellido}
            </p>
          )}
        </div>
      </fieldset>

      <div className="formulario-acudiente__campo">
        <label htmlFor="parentesco" className="formulario-acudiente__etiqueta">
          Parentesco:
        </label>
        <select
          id="parentesco"
          name="parentesco"
          value={formData.parentesco}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`formulario-acudiente__selector ${
            errors.parentesco ? "formulario-acudiente__selector--error" : ""
          }`}
        >
          <option value="" disabled>
            Seleccione parentesco
          </option>
          {opcionesParentesco.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.parentesco && (
          <p className="formulario-acudiente__mensaje-error">
            {errors.parentesco}
          </p>
        )}
      </div>

      <div className="formulario-acudiente__campo">
        <label
          htmlFor="tipoIdentificacion"
          className="formulario-acudiente__etiqueta"
        >
          Tipo de identificación:
        </label>
        <select
          id="tipoIdentificacion"
          name="tipoIdentificacion"
          value={formData.tipoIdentificacion}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`formulario-acudiente__selector ${
            errors.tipoIdentificacion
              ? "formulario-acudiente__selector--error"
              : ""
          }`}
        >
          {opcionesTipoId.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.tipoIdentificacion && (
          <p className="formulario-acudiente__mensaje-error">
            {errors.tipoIdentificacion}
          </p>
        )}
      </div>

      <div className="formulario-acudiente__campo">
        <label
          htmlFor="numeroIdentificacion"
          className="formulario-acudiente__etiqueta"
        >
          Número de identificación:
        </label>
        <input
          id="numeroIdentificacion"
          type="number"
          name="numeroIdentificacion"
          value={formData.numeroIdentificacion}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`formulario-acudiente__entrada ${
            errors.numeroIdentificacion
              ? "formulario-acudiente__entrada--error"
              : ""
          }`}
        />
        {errors.numeroIdentificacion && (
          <p className="formulario-acudiente__mensaje-error">
            {errors.numeroIdentificacion}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled || !isFormValid}
        className="formulario-acudiente__boton-enviar"
      >
        Guardar Acudiente
      </button>
    </form>
  );
}

export default FormAcudiente;
