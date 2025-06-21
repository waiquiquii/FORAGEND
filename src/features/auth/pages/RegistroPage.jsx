import { useState } from "react";
import { registerUser } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { NavigateAuthButtons } from "../componets/ui/NavigateAuthButtons";
import "../../../styles/layouts/auth.css";
import "../../../styles/layouts/ReguistrarsePage.css";

const opcionesTipoId = {
  MAYOR_DE_EDAD: [
    { value: "CC", label: "Cédula de ciudadanía" },
    { value: "CE", label: "Cédula de extranjería" },
    { value: "PPT", label: "Permiso por protección temporal" },
  ],
  MENOR_DE_EDAD: [
    { value: "TI", label: "Tarjeta de identidad" },
    { value: "PPT", label: "Permiso por protección temporal" },
  ],
  MAYOR_DE_EDAD_Y_MENOR_DE_EDAD: [
    { value: "CC", label: "Cédula de ciudadanía" },
    { value: "CE", label: "Cédula de extranjería" },
    { value: "PPT", label: "Permiso por protección temporal" },
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

export default function RegistroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    cel: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    especialidad: "",
    fechaReTHUS: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const edad = calcularEdad(form.fechaNacimiento);

  let opcionesTipoIdFiltradas = [];
  if (!form.fechaNacimiento) {
    opcionesTipoIdFiltradas = opcionesTipoId.MAYOR_DE_EDAD_Y_MENOR_DE_EDAD;
  } else if (edad >= 18) {
    opcionesTipoIdFiltradas = opcionesTipoId.MAYOR_DE_EDAD;
  } else if (edad >= 12 && edad < 18) {
    opcionesTipoIdFiltradas = opcionesTipoId.MENOR_DE_EDAD;
  }

  const dominio = form.email.split("@")[1]?.split(".")[0]?.toLowerCase();
  const esMedico = form.email.endsWith("@cesde.net") || dominio === "cesde";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación de campos obligatorios generales
    if (
      !form.primerNombre ||
      !form.primerApellido ||
      !form.fechaNacimiento ||
      !form.tipoDocumento ||
      !form.numeroDocumento ||
      !form.cel ||
      !form.email ||
      !form.confirmEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    // Validación de campos obligatorios para médicos
    if (esMedico && (!form.especialidad || !form.fechaReTHUS)) {
      setError(
        "Especialidad y fecha de inscripción en ReTHUS son obligatorias para médicos."
      );
      return;
    }

    if (form.email !== form.confirmEmail) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const uid = await registerUser(form);

      if (esMedico) {
        alert("Registro de medico en revisión\nPronto tendrás acceso");
      }

      navigate("/Logout");
    } catch (err) {
      setError(err.message || "Error al registrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth__contenedor">
      <form onSubmit={handleSubmit} className="formulario formulario--grid">
        <h2 className="formulario__titulo">Registro de Usuario</h2>
        {error && <p className="formulario__error">{error}</p>}
        <NavigateAuthButtons />

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="primerNombre">
            Primer nombre *
          </label>
          <input
            id="primerNombre"
            name="primerNombre"
            placeholder="Juan"
            onChange={handleChange}
            value={form.primerNombre}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="segundoNombre">
            Segundo nombre
          </label>
          <input
            id="segundoNombre"
            name="segundoNombre"
            placeholder="Carlos"
            onChange={handleChange}
            value={form.segundoNombre}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="primerApellido">
            Primer apellido *
          </label>
          <input
            id="primerApellido"
            name="primerApellido"
            placeholder="Pérez"
            onChange={handleChange}
            value={form.primerApellido}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="segundoApellido">
            Segundo apellido
          </label>
          <input
            id="segundoApellido"
            name="segundoApellido"
            placeholder="Gómez"
            onChange={handleChange}
            value={form.segundoApellido}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="fechaNacimiento">
            Fecha de nacimiento *
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            placeholder="2000-01-01"
            onChange={handleChange}
            value={form.fechaNacimiento}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="tipoDocumento">
            Tipo de documento *
          </label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={form.tipoDocumento}
            onChange={handleChange}
            className="formulario__input"
            required
            disabled={!form.fechaNacimiento || (edad !== null && edad < 12)}
          >
            <option value="" disabled>
              {form.fechaNacimiento
                ? edad !== null && edad < 12
                  ? "No disponible para menores de 12"
                  : "Seleccione tipo de documento"
                : "Seleccione primero la fecha de nacimiento"}
            </option>
            {opcionesTipoIdFiltradas.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="numeroDocumento">
            Número de documento *
          </label>
          <input
            id="numeroDocumento"
            name="numeroDocumento"
            placeholder="1234567890"
            onChange={handleChange}
            value={form.numeroDocumento}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="cel">
            Celular *
          </label>
          <input
            id="cel"
            name="cel"
            placeholder="3001234567"
            onChange={handleChange}
            value={form.cel}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="email">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="usuario@email.com"
            onChange={handleChange}
            value={form.email}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="confirmEmail">
            Confirmar correo electrónico *
          </label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            placeholder="usuario@email.com"
            onChange={handleChange}
            value={form.confirmEmail}
            className="formulario__input"
          />
        </div>

        {esMedico && (
          <>
            <div className="formulario__grupo">
              <label className="formulario__label" htmlFor="especialidad">
                Especialidad *
              </label>
              <select
                id="especialidad"
                name="especialidad"
                onChange={handleChange}
                value={form.especialidad || ""}
                className="formulario__input"
                required
              >
                <option value="" disabled>
                  Seleccione especialidad
                </option>
                <option value="Medicina General">Medicina General</option>
                <option value="Pediatría">Pediatría</option>
                <option value="Ginecología">Ginecología</option>
                <option value="Cardiología">Cardiología</option>
                <option value="Dermatología">Dermatología</option>
                <option value="Psiquiatría">Psiquiatría</option>
                <option value="Oftalmología">Oftalmología</option>
                <option value="Ortopedia">Ortopedia</option>
                <option value="Neurología">Neurología</option>
                <option value="Anestesiología">Anestesiología</option>
              </select>
            </div>
            <div className="formulario__grupo">
              <label className="formulario__label" htmlFor="fechaReTHUS">
                Fecha de inscripción en ReTHUS *
              </label>
              <input
                type="date"
                id="fechaReTHUS"
                name="fechaReTHUS"
                onChange={handleChange}
                value={form.fechaReTHUS || ""}
                className="formulario__input"
                required
              />
            </div>
          </>
        )}

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="password">
            Contraseña *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="TuContraseña123"
            onChange={handleChange}
            value={form.password}
            className="formulario__input"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="confirmPassword">
            Confirmar contraseña *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="TuContraseña123"
            onChange={handleChange}
            value={form.confirmPassword}
            className="formulario__input"
          />
        </div>

        <button disabled={loading} type="submit" className="formulario__boton">
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
