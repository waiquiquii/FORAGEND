// src/features/auth/pages/LoginPage.jsx

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // el mismo módulo de firebase.js
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    else if (user?.role === "userClient") navigate("/user");
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // signInWithEmailAndPassword dispara onAuthStateChanged
      await signInWithEmailAndPassword(auth, email, password);
      // La redirección se hará automáticamente en el useEffect cuando cambie `user`
    } catch {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>

        <p className="mt-4 text-center">
          <Link to="/registro" className="text-blue-600 hover:underline">
            No tengo una cuenta
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link
            to="/recuperar"
            className="text-sm text-blue-500 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </form>
    </div>
  );
}
