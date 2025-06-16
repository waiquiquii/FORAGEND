import React from "react";
import { useState, useEffect } from "react";
import Calendario from "../components/Calendario";
// import "../../../styles/features/user/UserAgendar.css";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import {
  AgendarCitasProvider,
  useAgendarCitas,
} from "../context/AgendarCitasProvider"; // <-- Importa el hook

function UserAgendarContent() {
  const { seleccion } = useAgendarCitas(); // <-- Usa el hook aquí
  const { fecha, hora, servicio, profesional, paciente } = seleccion;

  const titulos = {
    seleccionPasiente: "Seleccionar Paciente",
    selecionFecha: "Seleccionar Fecha",
    seleccionTipoCita: "Seleccionar Tipo de Cita",
    seleccionEspecialidad: "Seleccionar Especialidad",
    seleccionDoctor: "Seleccionar Doctor",
    seleccionHorario: "Seleccionar Horario",
    confirmacion: "Confirmar Cita",
  };

  // otros pasos

  const pasosOpcionales = {
    ingresarDatospasiente:
      "Ingresar Datos del Paciente (dependiente legal) (opcional)",
  };

  // manejo de click en el boton siguiente
  const handleSiguiente = () => {
    console.log("Botón Siguiente clickeado");
  };

  const opciones = {
    pacientes: allOpciones.pacientes, // Opciones de pacientes
    tiposCita: allOpciones.tiposCita, // Opciones de tipos de cita
    especialidades: allOpciones.especialidades, // Opciones de especialidades
    doctores: allOpciones.doctores, // Opciones de doctores
    horarios: allOpciones.horarios, // Opciones de horarios
  };

  return (
    <div className="user-agendar">
      <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
      <div className="user-agendar__contenido">
        <div className="user-agendar__formulario">
          <div className="user-agendar__selector">
            <h3 className="user-agendar__selector-titulo">
              {titulos.seleccionPasiente}
            </h3>
            <select className="user-agendar__select">
              <option value="">Seleccione una opción</option>
              {Object.entries(opciones.pacientes).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Botones
              siguiente={() => {
                console.log("Siguiente clickeado");
              }}
            />
          </div>
          {/* <Calendario /> */}
          <div className="user-agendar__calendario">
            <Calendario />
            <Botones
              anterior={() => {
                console.log("Anterior clickeado");
              }}
              siguiente={() => {
                console.log("Siguiente clickeado");
              }}
            />
          </div>
          <div className="user-agendar__selector">
            <h3 className="user-agendar__selector-titulo">
              {titulos.seleccionTipoCita}
            </h3>
            <select className="user-agendar__select">
              <option value="">Seleccione una opción</option>
              {Object.entries(opciones.tiposCita).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Botones
              anterior={() => {
                console.log("Anterior clickeado");
              }}
              siguiente={() => {
                console.log("Siguiente clickeado");
              }}
            />
          </div>
          <div className="user-agendar__selector">
            <h3 className="user-agendar__selector-titulo">
              {titulos.seleccionEspecialidad}
            </h3>
            <select className="user-agendar__select">
              <option value="">Seleccione una opción</option>
              {Object.entries(opciones.especialidades).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Botones
              anterior={() => {
                console.log("Anterior clickeado");
              }}
              siguiente={() => {
                console.log("Siguiente clickeado");
              }}
            />
          </div>
          <div className="user-agendar__selector">
            <h3 className="user-agendar__selector-titulo">
              {titulos.seleccionDoctor}
            </h3>
            <select className="user-agendar__select">
              <option value="">Seleccione una opción</option>
              {Object.entries(opciones.doctores).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Botones
              anterior={() => {
                console.log("Anterior clickeado");
              }}
              siguiente={() => {
                console.log("Siguiente clickeado");
              }}
            />
          </div>
          <div className="user-agendar__selector">
            <h3 className="user-agendar__selector-titulo">
              {titulos.seleccionHorario}
            </h3>
            <select className="user-agendar__select">
              <option value="">Seleccione una opción</option>
              {Object.entries(opciones.horarios).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
            <Botones
              anterior={() => {
                console.log("Anterior clickeado");
              }}
              solicitar={() => {
                console.log("Solicitar clickeado");
              }}
            />
          </div>
        </div>
        <div className="user-agendar__seleccion">
          <div className="user-agendar__card">
            <CardInfoCita
              cita={{
                cita_id: 123456,
                tipo_cita: servicio.tipo || "No seleccionado",
                paciente: paciente.nombre || "No seleccionado",
                cita_fecha: fecha || "No seleccionado",
                cita_hora: "08:00 AM",
                cita_doctor: profesional.nombre || "No seleccionado",
                cita_consultorio: profesional.consultorio || "No asignado",
              }}
              isActive={true}
              otrasClasesParaCard="user-agendar__card-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Botones({ anterior, siguiente, solicitar }) {
  return (
    <div className="user-agendar__botones">
      {anterior && (
        <div className="user-agendar__botones-contenedor--anterior">
          <button
            className="user-agendar__boton user-agendar__boton--anterior"
            onClick={anterior}
          >
            Anterior
          </button>
        </div>
      )}
      {siguiente && (
        <div className="user-agendar__botones-contenedor--siguiente">
          <button
            className="user-agendar__boton user-agendar__boton--siguiente"
            onClick={siguiente}
          >
            Siguiente
          </button>
        </div>
      )}
      {solicitar && (
        <div className="user-agendar__botones-contenedor--solicitar">
          <button
            className="user-agendar__boton user-agendar__boton--solicitar"
            onClick={solicitar}
          >
            Solicitar
          </button>
        </div>
      )}
    </div>
  );
}

export default function UserAgendar() {
  return (
    <AgendarCitasProvider>
      <UserAgendarContent />
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
  pacientes: {
    1: "Para Mi",
    2: "Para otro (*dependiente legal)",
  },
};
