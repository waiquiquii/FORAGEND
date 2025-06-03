import { useState } from "react";
import { registerUser } from "../hooks/useRegister";
import { useNavigate, Link } from "react-router-dom";

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

    // Validación
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
      navigate("/"); // Redirige según lógica
    } catch (err) {
      setError("Error al registrar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Registro de Usuario</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="primerNombre"
          placeholder="Primer nombre *"
          onChange={handleChange}
          value={form.primerNombre}
          className="w-full border p-2 rounded"
        />
        <input
          name="segundoNombre"
          placeholder="Segundo nombre"
          onChange={handleChange}
          value={form.segundoNombre}
          className="w-full border p-2 rounded"
        />
        <input
          name="primerApellido"
          placeholder="Primer apellido *"
          onChange={handleChange}
          value={form.primerApellido}
          className="w-full border p-2 rounded"
        />
        <input
          name="segundoApellido"
          placeholder="Segundo apellido"
          onChange={handleChange}
          value={form.segundoApellido}
          className="w-full border p-2 rounded"
        />
        <input
          name="tipoDocumento"
          placeholder="Tipo de documento"
          onChange={handleChange}
          value={form.tipoDocumento}
          className="w-full border p-2 rounded"
        />
        <input
          name="numeroDocumento"
          placeholder="Número de documento"
          onChange={handleChange}
          value={form.numeroDocumento}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="fechaNacimiento"
          onChange={handleChange}
          value={form.fechaNacimiento}
          className="w-full border p-2 rounded"
        />
        <input
          name="cel"
          placeholder="Celular"
          onChange={handleChange}
          value={form.cel}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico *"
          onChange={handleChange}
          value={form.email}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña *"
          onChange={handleChange}
          value={form.password}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar contraseña *"
          onChange={handleChange}
          value={form.confirmPassword}
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Tengo una cuenta
        </Link>
      </p>
    </div>
  );
}
