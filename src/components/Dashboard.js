import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css"; // Archivo CSS para estilos personalizados


function Dashboard() {
  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        <div className="logo-dashboard"></div>
        <h2 className="dashboard-title">Bienvenido a tu perfil</h2>
        <h5 className="dashboard-subtitle">Aquí encontrarás toda la información sobre tu cuenta</h5>
        <div className="dashboard-options">
          <Link to="/Perfilusuario" className="btn btn-primary dashboard-button">Ver perfil</Link>
          <Link to="/Configuracion" className="btn btn-primary dashboard-button">Configuración</Link>
          <Link to="/Historial" className="btn btn-primary dashboard-button">Historial</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
