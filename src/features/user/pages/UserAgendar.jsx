import React, { useState, useEffect } from "react";
import { PASOS_AGENDAR } from "../services/funcionesAgendar";
import Calendario from "../components/Calendario";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import {
  AgendarCitasProvider,
  useAgendarCitas,
} from "../context/AgendarCitasProvider";

import "../../../styles/features/user/UserAgendar.css";

function UserAgendarContent() {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();

  const { fecha, hora, servicio, profesional, paciente } = seleccion;
  const [pasoActual, setPasoActual] = useState(
    PASOS_AGENDAR.SELECCIONAR_PACIENTE
  );

  const titulos = {
    seleccionPasiente: "Seleccionar Paciente",
    selecionFecha: "Selecccione una Fecha",
    seleccionTipoCita: "Seleccionar Tipo de Cita",
    seleccionEspecialidad: "Seleccionar Especialidad",
    seleccionDoctor: "Seleccionar Doctor",
    seleccionHorario: "Seleccionar Horario",
    confirmacion: "Confirmar Cita",
  };

  // Funciones para manejar los pasos

  const handleNextFromPaciente = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
  };

  const handlePrevFromFecha = () => {
    setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
  };

  const handleNextFromFecha = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA);
  };

  const handlePrevFromTipoCita = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
  };

  const handleNextFromTipoCita = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD);
  };

  const handlePrevFromEspecialidad = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA);
  };

  const handleNextFromEspecialidad = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO);
  };

  const handlePrevFromMedico = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD);
  };

  const handleNextFromMedico = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_HORA);
  };

  const handlePrevFromHora = () => {
    setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO);
  };

  const handleNextFromHora = () => {
    // Aquí podrías manejar la lógica de confirmación de la cita
    setPasoActual(PASOS_AGENDAR.CONFIRMACION);
  };

  const opciones = {
    pacientes: allOpciones.pacientes,
    tiposCita: allOpciones.tiposCita,
    especialidades: allOpciones.especialidades,
    doctores: allOpciones.doctores,
    horarios: allOpciones.horarios,
  };

  // Handlers para los cambios en los selects
  const handleChangePaciente = (e) => {
    actualizarSeleccion({
      paciente: {
        ...paciente,
        nombre: "Elmer Mosquera",
        parentesco:
          e.target.value === "PARA_OTRO"
            ? "Dependiente Legal"
            : e.target.value === "PARA_MI"
            ? null
            : null,
      },
    });
    console.log("Paciente seleccionado:", e.target.value);
  };

  const handleChangeTipoCita = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        tipo: opciones.tiposCita[e.target.value] || e.target.value,
      },
    });
    console.log("Tipo de cita seleccionado:", e.target.value);
  };

  const handleChangeEspecialidad = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        especialidad: e.target.value,
      },
    });
    console.log("Especialidad seleccionada:", e.target.value);
  };

  const handleChangeDoctor = (e) => {
    actualizarSeleccion({
      profesional: {
        nombre: opciones.doctores[e.target.value] || e.target.value,
        consultorio: `consultorio ${e.target.value}`,
      },
    });
    console.log("Doctor seleccionado:", e.target.value);
  };

  const handleChangeHorario = (e) => {
    actualizarSeleccion({
      hora: opciones.horarios[e.target.value] || e.target.value,
    });
    console.log("Horario seleccionado:", e.target.value);
  };

  return (
    <div className="user-agendar">
      <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
      <div className="user-agendar__contenido">
        <div className="user-agendar__formulario">
          {pasoActual === PASOS_AGENDAR.SELECCIONAR_PACIENTE && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.seleccionPasiente}
              </h3>
              <select
                className="user-agendar__select"
                onChange={handleChangePaciente}
              >
                <option value="">Seleccione una opción</option>
                {Object.entries(opciones.pacientes).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <Botones
                siguiente={() => {
                  handleNextFromPaciente();
                  console.log("Siguiente clickeado");
                }}
              />
            </div>
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_FECHA && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.selecionFecha}
              </h3>
              <Calendario />
              <Botones
                anterior={() => {
                  handlePrevFromFecha();
                  console.log("Anterior clickeado");
                }}
                siguiente={() => {
                  handleNextFromFecha();
                  console.log("Siguiente clickeado");
                }}
              />
            </div>
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_TIPO_CITA && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.seleccionTipoCita}
              </h3>
              <select
                className="user-agendar__select"
                value={servicio.tipo || ""}
                onChange={handleChangeTipoCita}
              >
                <option value="">Seleccione una opción</option>
                {Object.entries(opciones.tiposCita).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <Botones
                anterior={() => {
                  handlePrevFromTipoCita();
                  console.log("Anterior clickeado");
                }}
                siguiente={() => {
                  handleNextFromTipoCita();
                  console.log("Siguiente clickeado");
                }}
              />
            </div>
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_ESPECIALIDAD && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.seleccionEspecialidad}
              </h3>
              <select
                className="user-agendar__select"
                onChange={handleChangeEspecialidad}
              >
                <option value="">Seleccione una opción</option>
                {Object.entries(opciones.especialidades).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <Botones
                anterior={() => {
                  handlePrevFromEspecialidad();
                  console.log("Anterior clickeado");
                }}
                siguiente={() => {
                  handleNextFromEspecialidad();
                  console.log("Siguiente clickeado");
                }}
              />
            </div>
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_MEDICO && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.seleccionDoctor}
              </h3>
              <select
                className="user-agendar__select"
                onChange={handleChangeDoctor}
              >
                <option value="">Seleccione una opción</option>
                {Object.entries(opciones.doctores).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <Botones
                anterior={() => {
                  handlePrevFromMedico();
                  console.log("Anterior clickeado");
                }}
                siguiente={() => {
                  handleNextFromMedico();
                  console.log("Siguiente clickeado");
                }}
              />
            </div>
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_HORA && (
            <div className="user-agendar__selector">
              <h3 className="user-agendar__selector-titulo">
                {titulos.seleccionHorario}
              </h3>
              <select
                className="user-agendar__select"
                onChange={handleChangeHorario}
              >
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
                  handlePrevFromHora();
                }}
                solicitar={() => {
                  console.log("Solicitar clickeado");
                  handleNextFromHora();
                }}
              />
            </div>
          )}
        </div>
        <div className="user-agendar__seleccion">
          <div className="user-agendar__card">
            <CardInfoCita
              cita={{
                cita_id: 123456,
                tipo_cita: servicio.tipo || "No seleccionado",
                cita_paciente: paciente.nombre || "No seleccionado",
                cita_parentesco: paciente.parentesco || null,
                cita_fecha: fecha || "No seleccionado",
                cita_hora: hora || "No seleccionado",
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
    PARA_MI: "Para Mi",
    PARA_OTRO: "Para otro (*dependiente legal)",
  },
};
