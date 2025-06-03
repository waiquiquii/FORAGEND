// src/components/layout/UserLayout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Área de Usuario</h1>
      </header>

      <div className="flex flex-1">
        <nav className="w-48 bg-gray-100 p-4">
          <ul>
            <li className="mb-2">
              <Link to="/user/agendar" className="hover:underline">
                Agendar Cita
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/user/mis-citas" className="hover:underline">
                Mis Citas
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/user/perfil" className="hover:underline">
                Mi Perfil
              </Link>
            </li>
            <li className="mt-4">
              <Link to="/logout" className="text-red-600 hover:underline">
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>

      <footer className="bg-blue-600 text-white p-2 text-center">
        &copy; {new Date().getFullYear()} FORAGEND
      </footer>
    </div>
  );
};

export default UserLayout;
