import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../../../styles/layouts/auth.css";
import "../../../styles/layouts/RecuperarPassword.css";

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
    <div className="auth__contenedor">
      <form
        className="password-recovery__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="password-recovery__title">Recuperar contraseña</h2>

        {mensaje && <p className="password-recovery__success">{mensaje}</p>}
        {error && <p className="password-recovery__error">{error}</p>}
        <div className="password-recovery__field">
          <input
            className="password-recovery__input"
            type="email"
            placeholder="Correo electrónico"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="password-recovery__error">{errors.email.message}</p>
          )}
        </div>

        <button
          className="password-recovery__button"
          type="submit"
          disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar enlace de recuperación"}
        </button>

        <p className="password-recovery__link">
          <Link to="/login">Volver al inicio de sesión</Link>
        </p>
      </form>
    </div>
  );
}
