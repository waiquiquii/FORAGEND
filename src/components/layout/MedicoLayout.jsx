// src/components/layout/MedicoLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import "../../styles/layouts/Layout.css"; // Importa la hoja de estilos

const MedicoLayout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__body">
        <nav className="layout-nav__lateral">
          <ul className="layout-nav__list">
            <li className="layout-nav__item">
              <Link to="/medico/dashboard" className="layout-nav__link">
                Dashboard Médico
              </Link>
            </li>
            <li className="layout-nav__item">
              <Link to="/medico/citas" className="layout-nav__link">
                Mis Citas
              </Link>
            </li>
            <li className="layout-nav__item">
              <Link to="/medico/perfil" className="layout-nav__link">
                Mi Perfil
              </Link>
            </li>
          </ul>
        </nav>

        <main className="layout__main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MedicoLayout;
