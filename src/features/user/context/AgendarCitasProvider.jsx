import React, { createContext, useContext, useState } from "react";

// Crear el contexto
const AgendarCitasContext = createContext();

// Hook para usar el contexto fácilmente
export const useAgendarCitas = () => useContext(AgendarCitasContext);

// Proveedor del contexto
export const AgendarCitasProvider = ({ children }) => {
  const [seleccion, setSeleccion] = useState({
    fecha: null,
    hora: null,
    servicio: {
      tipo: null,
      especialidad: null,
    },
    profesional: { nombre: null, consultorio: null },
    paciente: { nombre: null, parentesco: null },
  });

  const actualizarSeleccion = (nuevaSeleccion) => {
    setSeleccion((prev) => ({
      ...prev,
      ...nuevaSeleccion,
    }));
  };

  const limpiarSeleccion = () => {
    setSeleccion({
      fecha: null,
      hora: null,
      servicio: {
        tipo: null,
        especialidad: null,
      },
      profesional: { nombre: null, consultorio: null },
      paciente: { nombre: null, parentesco: null },
    });
  };

  return (
    <AgendarCitasContext.Provider
      value={{
        seleccion,
        actualizarSeleccion,
        limpiarSeleccion,
      }}
    >
      {children}
    </AgendarCitasContext.Provider>
  );
};
