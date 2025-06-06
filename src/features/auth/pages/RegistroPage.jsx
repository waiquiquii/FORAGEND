import { useState, useEffect } from "react";
import { registerUser } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { NavigateAuthButtons } from "../componets/ui/NavigateAuthButtons";
import "../../../styles/layouts/auth.css";
import "../../../styles/layouts/ReguistrarsePage.css";

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
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !form.primerNombre ||
      !form.primerApellido ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Por favor completa todos los campos obligatorios.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      await registerUser(form);
      navigate("/");
    } catch (err) {
      setError("Error al registrar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para calcular tipo de documento según la edad
  function getTipoDocumentoByAge(fechaNacimiento) {
    if (!fechaNacimiento) return "";
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 18 ? (age < 15 ? (age < 12 ? "ERROR" : "TI") : "TI") : "CC";
  }

  // Actualiza tipoDocumento automáticamente cuando cambia la fecha de nacimiento
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      tipoDocumento: getTipoDocumentoByAge(prev.fechaNacimiento),
    }));
  }, [form.fechaNacimiento]);

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
            Fecha de nacimiento
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
            Tipo de documento
          </label>
          <input
            id="tipoDocumento"
            name="tipoDocumento"
            value={form.tipoDocumento}
            className="formulario__input"
            readOnly
            tabIndex={-1}
            style={{ background: "#f3f3f3", color: "#888" }}
            placeholder="Se asigna automáticamente"
          />
        </div>

        <div className="formulario__grupo">
          <label className="formulario__label" htmlFor="numeroDocumento">
            Número de documento
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
            Celular
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
            value={form.confirmEmail || ""}
            className="formulario__input"
          />
        </div>

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
