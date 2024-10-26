import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Dashboard.css";


function Dashboard() {
  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
      <p className="citas-reservadas">Citas reservadas</p>
      < p className="Contador-citas">1</p>
      </div>
    </div>
  );
}

export default Dashboard;
