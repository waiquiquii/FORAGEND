import React from "react";
import { useState, useEffect } from "react";
import Calendario from "../components/Calendario";
import "../../../styles/features/user/UserAgendar.css";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import { AgendarCitasProvider } from "../context/AgendarCitasProvider";

export default function UserAgendar() {
  // pasos para agendar una cita

  const [selectActivo, setSelectActivo] = useState({
    tituloSelect,
    opcionesSelect,
  });

  const pasos = {
    selecionFecha: "Seleccionar Fecha",
    selecionTipoCita: "Seleccionar Tipo de Cita",
    selecionEspecialidad: "Seleccionar Especialidad",
    selecionDoctor: "Seleccionar Doctor",
    selecionHorario: "Seleccionar Horario",
    confirmacion: "Confirmar Cita",
  };

  // otros pasos

  const pasosOpcionales = {
    ingresarDatosPasiente:
      "Ingresar Datos del Paciente (dependiente legal) (opcional)",
  };

  // manejo de click en el boton siguiente
  const handleSiguiente = () => {
    console.log("Botón Siguiente clickeado");
  };

  const opciones = {
    tiposCita: allOpciones.tiposCita, // Opciones de tipos de cita
    especialidades: allOpciones.especialidades, // Opciones de especialidades
    doctores: allOpciones.doctores, // Opciones de doctores
    horarios: allOpciones.horarios, // Opciones de horarios
  };

  const tituloSelect = pasos.selecionTipoCita; // Título del select

  const opcionesSelect = opciones.tiposCita; // Opciones para el select

  return (
    <AgendarCitasProvider>
      <div className="user-agendar">
        <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
        <div className="user-agendar__contenido">
          <div className="user-agendar__calendario">
            <Calendario />
          </div>
          <div className="user-agendar__seleccion">
            <div className="user-agendar__card">
              <CardInfoCita
                cita={{
                  cita_id: 123456,
                  tipo_cita: pasos.selecionFecha,
                  cita_fecha: "2023-10-01",
                  cita_hora: "08:00 AM",
                  cita_doctor: "Dr. Juan Pérez",
                  cita_consultorio: "Consultorio 1",
                }}
                isActive={true}
                otrasClasesParaCard="user-agendar__card-info"
              />
            </div>
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">{tituloSelect}</h3>
              <select className="user-agendar__select">
                <option value="">Seleccione una opción</option>
                {Object.entries(opcionesSelect).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="user-agendar__botones">
          <button
            className="user-agendar__boton user-agendar__boton--siguiente"
            onClick={handleSiguiente}
          >
            Siguiente
          </button>
        </div>
      </div>
    </AgendarCitasProvider>
  );
}

const allOpciones = {
  tiposCita: {
    1: "Consulta General",
    2: "Consulta Especializada",
    3: "Examen Médico",
  },
  especialidades: {
    1: "Medicina General",
    2: "Pediatría",
    3: "Ginecología",
    4: "Dermatología",
  },
  doctores: {
    1: "Dr. Juan Pérez",
    2: "Dra. Ana Gómez",
    3: "Dr. Carlos López",
    4: "Dra. María Rodríguez",
  },
  horarios: {
    turno1: "08:00 - 08:30 AM",
    turno2: "08:30 - 09:00 AM",
    turno3: "09:00 - 09:30 AM",
  },
};
