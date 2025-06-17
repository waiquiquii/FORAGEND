import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // el mismo módulo de firebase.js
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../hooks/userLogin";

import "../../../styles/layouts/auth.css";
import "../../../styles/layouts/LoginPage.css";
import { NavigateAuthButtons } from "../componets/ui/NavigateAuthButtons";

export default function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados locales para email, password y error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya hay un user logueado, redirige según rol
  useEffect(() => {
    if (user?.role === "admin") navigate("/admin");
    else if (user?.role === "medico") navigate("/medico");
    else if (user?.role === "cliente") navigate("/user");
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones preliminares en el cliente
    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      // signInWithEmailAndPassword dispara onAuthStateChanged
      await signInWithEmailAndPassword(auth, email, password);
      // La redirección se hará automáticamente en el useEffect cuando cambie `user`
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="auth__contenedor">
      <form onSubmit={handleLogin} className="auth-login__formulario">
        <h2 className="auth-login__titulo">Iniciar Sesión</h2>
        <NavigateAuthButtons />
        {error && <p className="auth-login__error">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-login__input"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-login__input"
          required
        />

        <button type="submit" className="auth-login__boton">
          Ingresar
        </button>
        <p className="auth-login__recuperar">
          <Link
            to="/recuperar"
            className="auth-login__link auth-login__link--recuperar"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </form>
    </div>
  );
}
