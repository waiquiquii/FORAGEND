import React, { useEffect, useState, useMemo } from "react";
import { useAgendarCitas } from "../context/AgendarCitasProvider";
import { useAuth } from "../../../features/auth/context/AuthContext";
import useForm from "../../../hooks/useForm";
import dependienteValidations from "../formConfigs/dependienteValidations";
import { registerDependiente } from "../services/useDependiente";
import "../../../styles/features/user/FormDependiente.css";

const opcionesParentesco = [
  { value: "hijo", label: "Hijo/a" },
  { value: "nieto", label: "Nieto/a" },
  { value: "sobrino", label: "Sobrino/a" },
  { value: "otro", label: "Otro" },
];
const opcionesTipoId = {
  MAYOR_DE_EDAD: [
    { value: "CC", label: "Cédula de ciudadanía" },
    { value: "CE", label: "Cédula de extranjería" },
    { value: "PPT", label: "Permiso por protección temporal" },
  ],
  MENOR_DE_EDAD: [
    { value: "RC", label: "Registro civil" },
    { value: "TI", label: "Tarjeta de identidad" },
    { value: "PPT", label: "Permiso por protección temporal" },
  ],
  MAYOR_DE_EDAD_Y_MENOR_DE_EDAD: [
    { value: "CC", label: "Cédula de ciudadanía" },
    { value: "CE", label: "Cédula de extranjería" },
    { value: "PPT", label: "Permiso por protección temporal" },
    { value: "RC", label: "Registro civil" },
    { value: "TI", label: "Tarjeta de identidad" },
  ],
};

function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function FormDependiente({
  data = {},
  onChange = () => {},
  onSuccess = () => {},
  disabled = false,
}) {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const { paciente } = seleccion;
  const [guardado, setGuardado] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const { user } = useAuth(); // Asegúrate de tener el uid del usuario

  const initialFormState = {
    nombres: data.nombres || "",
    primerApellido: data.primerApellido || "",
    segundoApellido: data.segundoApellido || "",
    parentesco: data.parentesco || "",
    tipoIdentificacion: data.tipoIdentificacion || "",
    numeroIdentificacion: data.numeroIdentificacion || "",
    fechaNacimiento: data.fechaNacimiento || "",
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
      await registerDependiente(formData, user?.uid);
      setGuardado(true);
      onSuccess(formData);
      actualizarSeleccion({
        paciente: {
          ...paciente,
          parentesco: formData.parentesco,
          nombre: `${formData.nombres} ${formData.primerApellido}`,
        },
      });
    } catch (err) {
      setErrorApi(
        err.message || "No se pudo guardar el dependiente. Intenta de nuevo."
      );
    }
  }

  // Determina la edad del dependiente
  const edad = useMemo(
    () => calcularEdad(formData.fechaNacimiento),
    [formData.fechaNacimiento]
  );

  // Determina las opciones de tipo de identificación según la edad
  let opcionesTipoIdFiltradas = [];
  if (!formData.fechaNacimiento) {
    // Si no hay fecha, muestra todas
    opcionesTipoIdFiltradas = opcionesTipoId.MAYOR_DE_EDAD_Y_MENOR_DE_EDAD;
  } else if (edad >= 18) {
    opcionesTipoIdFiltradas = opcionesTipoId.MAYOR_DE_EDAD;
  } else if (edad >= 0 && edad < 18) {
    opcionesTipoIdFiltradas = opcionesTipoId.MENOR_DE_EDAD;
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
          {opcionesTipoIdFiltradas.map(({ value, label }) => (
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

      <div className="formulario-dependiente__boton-wrapper">
        <button
          type="submit"
          disabled={disabled || !isFormValid || guardado}
          className="formulario-dependiente__boton-enviar"
        >
          Guardar Dependiente
        </button>
      </div>

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
