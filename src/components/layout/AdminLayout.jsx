// src/components/layout/AdminLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Panel Admin</h1>
      </header>

      <div className="flex flex-1">
        {/* Navegación lateral */}
        <nav className="w-48 bg-gray-200 p-4">
          <ul>
            <li className="mb-2">
              <Link to="/admin/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/usuarios" className="hover:underline">
                Usuarios
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/configuracion" className="hover:underline">
                Configuración
              </Link>
            </li>
            <li className="mt-4">
              <Link to="/logout" className="text-red-600 hover:underline">
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>

      <footer className="bg-gray-800 text-white p-2 text-center">
        &copy; {new Date().getFullYear()} FORAGEND
      </footer>
    </div>
  );
};

export default AdminLayout;
