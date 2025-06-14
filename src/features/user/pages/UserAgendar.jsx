import React, { useState } from "react";
import Calendario from "../components/Calendario";
import { agendarCita } from "../../../services/agendarCita";

import "../../../styles/features/user/UserAgendar.css";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import { useAgendarCitas } from "../context/AgendarCitasProvider";
import { getAuth } from "firebase/auth";

export default function UserAgendar() {
  // pasos para agendar una cita

  const [pasoActual, setPasoActual] = useState(0);
  const [confirmacion, setConfirmacion] = useState(false);

  const { seleccion, actualizarSeleccion, limpiarSeleccion } =
    useAgendarCitas();

  const pasos = {
    selecionFecha: "Seleccionar Fecha",
    selecionTipoCita: "Seleccionar Tipo de Cita",
    selecionEspecialidad: "Seleccionar Especialidad",
    selecionDoctor: "Seleccionar Doctor",
    selecionHorario: "Seleccionar Horario",
    confirmacion: "Confirmar Cita",
  };

  // opciones para los select

  const opciones = {
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

  // otros pasos

  const pasosOpcionales = {
    ingresarDatosPasiente:
      "Ingresar Datos del Paciente (dependiente legal) (opcional)",
  };

  // manejo de click en el boton siguiente
  const handleSiguiente = (e) => {
    e && e.preventDefault();

    // Si estamos en el paso de tipo de cita (pasoActual === 1)
    // y el usuario seleccionó "Consulta General" (servicio === "1"),
    // saltamos el paso de especialidad y vamos directo al paso de doctor (paso 3)
    if (pasoActual === 1 && seleccion.servicio === "1") {
      setPasoActual(3);
    } else {
      setPasoActual((prev) => prev + 1);
    }
  };

  // manejo de click en el boton atras
  const handleAtras = (e) => {
    e && e.preventDefault();

    // Si estamos en el paso de doctor y el tipo de cita es general, saltar a tipo de cita
    if (pasoActual === 3 && seleccion.servicio === "1") {
      setPasoActual(1);
      return;
    }

    // Si estamos en el primer paso, limpiar selección
    if (pasoActual === 1) {
      limpiarSeleccion();
    }

    setPasoActual((prev) => (prev > 0 ? prev - 1 : 0));
  };

  // manejo de click en el boton confirmar
  const handleConfirmar = async (e) => {
    e.preventDefault();
    try {
      await agendarCita(seleccion);
      alert("¡Cita agendada con éxito!");
      limpiarSeleccion();
      setPasoActual(0);
    } catch (error) {
      alert("Error al agendar cita: " + error.message);
    }
  };

  const handleTipoCitaChange = (e) => {
    actualizarSeleccion({ servicio: e.target.value });
  };

  const handleEspecialidadChange = (e) => {
    actualizarSeleccion({ especialidad: e.target.value });
  };

  const handleDoctorChange = (e) => {
    actualizarSeleccion({ profesional: e.target.value });
  };

  const handleHorarioChange = (e) => {
    actualizarSeleccion({ hora: e.target.value });
  };

  return (
    <div className="user-agendar">
      <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
      <div className="user-agendar__contenido">
        {!confirmacion && (
          <div className="user-agendar__calendario">
            <Calendario />
            <div className="user-agendar__botones">
              <button
                className="user-agendar__boton user-agendar__boton--siguiente"
                onClick={handleSiguiente}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
        <div className="user-agendar__seleccion">
          {confirmacion && (
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
              <div className="user-agendar__botones">
                <button
                  className="user-agendar__boton user-agendar__boton--siguiente"
                  onClick={handleAtras}
                >
                  atras
                </button>
                <button
                  className="user-agendar__boton user-agendar__boton--siguiente"
                  onClick={handleSubmit}
                  disabled={!seleccion.hora || !seleccion.profesional}
                >
                  Agendar
                </button>
              </div>
            </div>
          )}
          {!confirmacion && (
            <div className="user-agendar__formConenedor">
              <form className="user-agendar__form">
                {pasoActual === 1 && (
                  <div className="user-agendar__selector">
                    <h3 className="user-agendar__selector-titulo">
                      {pasos.selecionTipoCita}
                    </h3>
                    <select
                      className="user-agendar__select"
                      onChange={handleTipoCitaChange}
                      value={seleccion.servicio || ""}
                    >
                      <option value="">Seleccione una opción</option>
                      {Object.entries(opciones.tiposCita).map(
                        ([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                    <div className="user-agendar__botones">
                      <button
                        className="user-agendar__boton user-agendar__boton--atras"
                        onClick={handleAtras}
                      >
                        atras
                      </button>
                      <button
                        className="user-agendar__boton user-agendar__boton--siguiente"
                        onClick={handleSiguiente}
                        disabled={!seleccion.servicio}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
                {pasoActual === 2 && (
                  <div className="user-agendar__selector">
                    <h3 className="user-agendar__selector-titulo">
                      {pasos.selecionEspecialidad}
                    </h3>
                    <select
                      className="user-agendar__select"
                      onChange={handleEspecialidadChange}
                      value={seleccion.especialidad || ""}
                    >
                      <option value="">Seleccione una opción</option>
                      {Object.entries(opciones.especialidades).map(
                        ([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                    <div className="user-agendar__botones">
                      <button
                        className="user-agendar__boton user-agendar__boton--atras"
                        onClick={handleAtras}
                      >
                        atras
                      </button>
                      <button
                        className="user-agendar__boton user-agendar__boton--siguiente"
                        onClick={handleSiguiente}
                        disabled={!seleccion.especialidad}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
                {pasoActual === 3 && (
                  <div className="user-agendar__selector">
                    <h3 className="user-agendar__selector-titulo">
                      {pasos.selecionDoctor}
                    </h3>
                    <select
                      className="user-agendar__select"
                      onChange={handleDoctorChange}
                      value={seleccion.profesional || ""}
                    >
                      <option value="">Seleccione una opción</option>
                      {Object.entries(opciones.doctores).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <div className="user-agendar__botones">
                      <button
                        className="user-agendar__boton user-agendar__boton--atras"
                        onClick={handleAtras}
                      >
                        atras
                      </button>
                      <button
                        className="user-agendar__boton user-agendar__boton--siguiente"
                        onClick={handleSiguiente}
                        disabled={!seleccion.profesional}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
                {pasoActual === 4 && (
                  <div className="user-agendar__selector">
                    <h3 className="user-agendar__selector-titulo">
                      {pasos.selecionHorario}
                    </h3>
                    <select
                      className="user-agendar__select"
                      onChange={handleHorarioChange}
                      value={seleccion.hora || ""}
                    >
                      <option value="">Seleccione una opción</option>
                      {Object.entries(opciones.horarios).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                    <div className="user-agendar__botones">
                      <button
                        className="user-agendar__boton user-agendar__boton--atras"
                        onClick={handleAtras}
                      >
                        atras
                      </button>
                      <button
                        className="user-agendar__boton user-agendar__boton--siguiente"
                        onClick={handleSiguiente}
                        disabled={!seleccion.hora}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                )}
                {pasoActual === 5 && (
                  <button
                    className="user-agendar__boton user-agendar__boton--siguiente"
                    onClick={handleConfirmar}
                  >
                    Confirmar
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
