import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../../styles/ui/NavigateAuthButtons.css";

export function NavigateAuthButtons() {
  const location = useLocation();
  const esRegistro = location.pathname === "/registro";

  return (
    <div className="NavAuth__botones-toggle">
      <Link
        to="/login"
        className={
          "NavAuth__boton-toggle" +
          (!esRegistro ? " NavAuth__boton-toggle--activo" : "")
        }
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/registro"
        className={
          "NavAuth__boton-toggle" +
          (esRegistro ? " NavAuth__boton-toggle--activo" : "")
        }
      >
        Registrarse
      </Link>
    </div>
  );
}
