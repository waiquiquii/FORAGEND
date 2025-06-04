// src/components/layout/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import "../../styles/layouts/Layout.css"; // Importa la hoja de estilos

const AdminLayout = () => {
  return (
    <div className="layout">
      <Header />

      <div className="layout__body">
        <nav className="layout-nav__lateral">
          <ul className="layout-nav__list">
            <li className="layout-nav__item">
              <Link to="/admin/dashboard" className="layout-nav__link">
                Dashboard
              </Link>
            </li>
            <li className="layout-nav__item">
              <Link to="/admin/usuarios" className="layout-nav__link">
                Usuarios
              </Link>
            </li>
            <li className="layout-nav__item">
              <Link to="/admin/configuracion" className="layout-nav__link">
                Configuración
              </Link>
            </li>
            <li className="layout-nav__item">
              <Link
                to="/logout"
                className="layout-nav__link layout-nav__link--logout"
              >
                Cerrar sesión
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

export default AdminLayout;
