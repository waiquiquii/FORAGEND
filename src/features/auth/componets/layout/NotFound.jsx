// src/components/layout/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg mb-4">Página no encontrada</p>
      <Link to="/login" className="text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
