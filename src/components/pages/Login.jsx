import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Login.css"; // Archivo CSS para estilos personalizados

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica de autenticación
    navigate("/"); // Redirige al inicio
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="logo-login"></div>
        <h2 className="Iniciar-sesion">Iniciar Sesión</h2>
        <h5 className="Titulo-principal-login">
          {" "}
          Bienvenido a nuestra plataforma{" "}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="labcorre" htmlFor="username">
              Correo:{" "}
            </label>
            <input
              type="text"
              className="form-control my-hover-input"
              id="username"
              placeholder="Ingresa tu correo electronico"
            />
          </div>
          <div className="form-group">
            <label className="edicontra" htmlFor="password">
              Contraseña:
            </label>
            <input
              type="password"
              className="form-control my-hover-input"
              id="email"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block login-button"
          >
            Ingresar
          </button>
          <a href="/reset-password" className="reset-password-link">
            Recuperar cuenta
          </a>{" "}
          {/* Proporciona una URL válida */}
        </form>
      </div>
    </div>
  );
}

export default Login;
