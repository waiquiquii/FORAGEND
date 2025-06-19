import React, { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import dependienteValidations from "../formConfigs/dependienteValidations";
import "../../../styles/features/user/FormDependiente.css";

const opcionesParentesco = [
  { value: "hijo", label: "Hijo/a" },
  { value: "nieto", label: "Nieto/a" },
  { value: "sobrino", label: "Sobrino/a" },
  { value: "otro", label: "Otro" },
];
const opcionesTipoId = [
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "PPT", label: "Permiso por protección temporal" },
];
const opcionesGenero = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro / Prefiero no decir" },
];

function FormDependiente({
  data = {},
  onChange = () => {},
  onSuccess = () => {},
  disabled = false,
}) {
  const [guardado, setGuardado] = useState(false);
  const [errorApi, setErrorApi] = useState(null);

  const initialFormState = {
    nombres: data.nombres || "",
    primerApellido: data.primerApellido || "",
    segundoApellido: data.segundoApellido || "",
    parentesco: data.parentesco || "",
    tipoIdentificacion: data.tipoIdentificacion || "",
    numeroIdentificacion: data.numeroIdentificacion || "",
    fechaNacimiento: data.fechaNacimiento || "",
    genero: data.genero || "",
  };

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
    resetForm,
  } = useForm(initialFormState, dependienteValidations, handleGuardar);

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  async function handleGuardar() {
    setErrorApi(null);
    setGuardado(false);
    try {
      // Aquí deberías llamar a tu API para guardar el dependiente
      // await api.guardarDependiente(formData);
      await new Promise((res) => setTimeout(res, 700));
      setGuardado(true);
      onSuccess(formData); // Notifica al padre que se guardó correctamente
    } catch (err) {
      setErrorApi("No se pudo guardar el dependiente. Intenta de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="formulario-dependiente">
      <h3 className="formulario-dependiente__titulo">Datos del Dependiente</h3>
      <fieldset className="formulario-dependiente__grupo-campos">
        <legend className="formulario-dependiente__leyenda">
          Nombre completo
        </legend>
        <div className="formulario-dependiente__campo">
          <label htmlFor="nombres" className="formulario-dependiente__etiqueta">
            Nombres:
          </label>
          <input
            id="nombres"
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled || guardado}
            className={`formulario-dependiente__entrada ${
              errors.nombres ? "formulario-dependiente__entrada--error" : ""
            }`}
          />
          {errors.nombres && (
            <p className="formulario-dependiente__mensaje-error">
              {errors.nombres}
            </p>
          )}
        </div>
        <div className="formulario-dependiente__campo">
          <label
            htmlFor="primerApellido"
            className="formulario-dependiente__etiqueta"
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
            disabled={disabled || guardado}
            className={`formulario-dependiente__entrada ${
              errors.primerApellido
                ? "formulario-dependiente__entrada--error"
                : ""
            }`}
          />
          {errors.primerApellido && (
            <p className="formulario-dependiente__mensaje-error">
              {errors.primerApellido}
            </p>
          )}
        </div>
        <div className="formulario-dependiente__campo">
          <label
            htmlFor="segundoApellido"
            className="formulario-dependiente__etiqueta"
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
            disabled={disabled || guardado}
            className={`formulario-dependiente__entrada ${
              errors.segundoApellido
                ? "formulario-dependiente__entrada--error"
                : ""
            }`}
          />
          {errors.segundoApellido && (
            <p className="formulario-dependiente__mensaje-error">
              {errors.segundoApellido}
            </p>
          )}
        </div>
      </fieldset>

      <div className="formulario-dependiente__campo">
        <label
          htmlFor="parentesco"
          className="formulario-dependiente__etiqueta"
        >
          Parentesco:
        </label>
        <select
          id="parentesco"
          name="parentesco"
          value={formData.parentesco}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled || guardado}
          className={`formulario-dependiente__selector ${
            errors.parentesco ? "formulario-dependiente__selector--error" : ""
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
          <p className="formulario-dependiente__mensaje-error">
            {errors.parentesco}
          </p>
        )}
      </div>

      <div className="formulario-dependiente__campo">
        <label
          htmlFor="tipoIdentificacion"
          className="formulario-dependiente__etiqueta"
        >
          Tipo de identificación:
        </label>
        <select
          id="tipoIdentificacion"
          name="tipoIdentificacion"
          value={formData.tipoIdentificacion}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled || guardado}
          className={`formulario-dependiente__selector ${
            errors.tipoIdentificacion
              ? "formulario-dependiente__selector--error"
              : ""
          }`}
        >
          <option value="" disabled>
            Seleccione tipo de documento
          </option>
          {opcionesTipoId.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.tipoIdentificacion && (
          <p className="formulario-dependiente__mensaje-error">
            {errors.tipoIdentificacion}
          </p>
        )}
      </div>

      <div className="formulario-dependiente__campo">
        <label
          htmlFor="numeroIdentificacion"
          className="formulario-dependiente__etiqueta"
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
          disabled={disabled || guardado}
          className={`formulario-dependiente__entrada ${
            errors.numeroIdentificacion
              ? "formulario-dependiente__entrada--error"
              : ""
          }`}
        />
        {errors.numeroIdentificacion && (
          <p className="formulario-dependiente__mensaje-error">
            {errors.numeroIdentificacion}
          </p>
        )}
      </div>

      <div className="formulario-dependiente__campo">
        <label
          htmlFor="fechaNacimiento"
          className="formulario-dependiente__etiqueta"
        >
          Fecha de nacimiento:
        </label>
        <input
          id="fechaNacimiento"
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled || guardado}
          className={`formulario-dependiente__entrada ${
            errors.fechaNacimiento
              ? "formulario-dependiente__entrada--error"
              : ""
          }`}
        />
        {errors.fechaNacimiento && (
          <p className="formulario-dependiente__mensaje-error">
            {errors.fechaNacimiento}
          </p>
        )}
      </div>

      <div className="formulario-dependiente__campo">
        <label htmlFor="genero" className="formulario-dependiente__etiqueta">
          Género:
        </label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled || guardado}
          className={`formulario-dependiente__selector ${
            errors.genero ? "formulario-dependiente__selector--error" : ""
          }`}
        >
          <option value="" disabled>
            Seleccione género
          </option>
          {opcionesGenero.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.genero && (
          <p className="formulario-dependiente__mensaje-error">
            {errors.genero}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={disabled || !isFormValid || guardado}
        className="formulario-dependiente__boton-enviar"
      >
        Guardar Dependiente
      </button>

      {guardado && (
        <p className="formulario-dependiente__mensaje-exito">
          Dependiente guardado correctamente.
        </p>
      )}
      {errorApi && (
        <p className="formulario-dependiente__mensaje-error">{errorApi}</p>
      )}
    </form>
  );
}

export default FormDependiente;
