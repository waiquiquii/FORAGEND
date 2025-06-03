import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RecuperarPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async ({ email }) => {
    setMensaje(null);
    setError(null);
    setEnviando(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMensaje("Revisa tu correo para restablecer tu contraseña.");
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Recuperar contraseña</h2>

      {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          {enviando ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>
      </form>

      <p className="mt-4 text-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Volver al inicio de sesión
        </Link>
      </p>
    </div>
  );
}
