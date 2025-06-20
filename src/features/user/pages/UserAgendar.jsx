import React, { useState } from "react";
import { PASOS_AGENDAR, allOpciones, titulos } from "../services/utilsAgendar";
import Calendario from "../components/Calendario";
import FormDependiente from "../components/FormDependiente";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import {
  AgendarCitasProvider,
  useAgendarCitas,
} from "../context/AgendarCitasProvider";

import { useAuth } from "../../../features/auth/context/AuthContext";
import { guardarCita } from "../services/useAgendar";
import "../../../styles/features/user/UserAgendar.css";

function UserAgendarContent() {
  const { user } = useAuth();
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const { fecha, hora, servicio, profesional, paciente } = seleccion;
  const [pasoActual, setPasoActual] = useState(
    PASOS_AGENDAR.SELECCIONAR_PACIENTE
  );
  const [dependienteGuardado, setDependienteGuardado] = useState(false);

  // Estado para manejar errores de validación
  const [errores, setErrores] = useState({});

  // Mostrar card solo en desktop/tablet y NO en confirmación
  const mostrarCard = () => {
    if (pasoActual === PASOS_AGENDAR.CONFIRMACION) return false;
    if (window.innerWidth <= 768) return false;
    return true;
  };

  // Handlers para los cambios en los selects
  const handleChangePaciente = (e) => {
    if (e.target.value === "PARA_MI" && user) {
      actualizarSeleccion({
        paciente: {
          nombre: user.nombre || user.email || "Usuario",
          parentesco: null,
        },
      });
    } else {
      actualizarSeleccion({
        paciente: {
          nombre: "...",
          parentesco: "...",
        },
      });
    }
  };

  const handleChangeTipoCita = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        tipo: allOpciones.tiposCita[e.target.value] || e.target.value,
      },
    });
  };

  const handleChangeEspecialidad = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        especialidad:
          allOpciones.especialidades[e.target.value] || e.target.value,
      },
    });
  };

  const handleChangeDoctor = (e) => {
    actualizarSeleccion({
      profesional: {
        nombre: allOpciones.doctores[e.target.value] || e.target.value,
        consultorio: `consultorio ${e.target.value}`,
      },
    });
  };

  const handleChangeHorario = (e) => {
    actualizarSeleccion({
      hora: allOpciones.horarios[e.target.value] || e.target.value,
    });
  };

  // Función para confirmar la cita
  const confirmarCita = async () => {
    try {
      const citaData = {
        tipo_cita: servicio.tipo,
        cita_fecha: fecha,
        cita_hora: hora,
        cita_doctor: profesional.nombre,
        cita_consultorio: profesional.consultorio,
        cita_paciente: paciente.nombre,
        cita_parentesco: paciente.parentesco,
      };
      await guardarCita(citaData, user.uid);
      alert("¡Cita agendada exitosamente!");
      setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
    } catch (error) {
      alert("Error al agendar la cita: " + error.message);
    }
  };

  // Determina el valor seleccionado para cada paso usando el contexto y las claves de opciones exepto "paciente"

  const tipoCitaValue =
    Object.entries(allOpciones.tiposCita).find(
      ([, val]) => val === servicio?.tipo
    )?.[0] || "";

  const especialidadValue =
    Object.entries(allOpciones.especialidades).find(
      ([, val]) => val === servicio?.especialidad
    )?.[0] || "";

  const doctorValue =
    Object.entries(allOpciones.doctores).find(
      ([, val]) => val === profesional?.nombre
    )?.[0] || "";

  const horarioValue =
    Object.entries(allOpciones.horarios).find(([, val]) => val === hora)?.[0] ||
    "";

  return (
    <div className="agendar">
      <h2 className="agendar__title">Agendar una Nueva Cita</h2>
      <div className="agendar__content">
        <div className="agendar__form">
          {/* Paso 1: Seleccionar Paciente */}
          {pasoActual === PASOS_AGENDAR.SELECCIONAR_PACIENTE && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">
                {titulos.seleccionPasiente}
              </h3>
              <div className="agendar__step-content">
                <select
                  className="agendar__select"
                  onChange={handleChangePaciente}
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {Object.entries(allOpciones.pacientes).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agendar__buttons">
                <button
                  className={`agendar__btn agendar__btn--next
                    ${
                      !seleccion.paciente?.nombre
                        ? "agendar__btn--disabled"
                        : ""
                    }`}
                  onClick={() => {
                    setDependienteGuardado(false);
                    if (seleccion.paciente?.parentesco != null) {
                      setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                    } else {
                      setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
                    }
                  }}
                  disabled={!seleccion.paciente?.nombre}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Agregar Dependiente */}
          {pasoActual === PASOS_AGENDAR.AGREGAR_DEPENDIENTE && (
            <div className="agendar__step">
              <div className="agendar__step-content">
                <FormDependiente
                  onSuccess={() => setDependienteGuardado(true)}
                />
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() =>
                    setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE)
                  }
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !dependienteGuardado ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
                  disabled={!dependienteGuardado}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Seleccionar Fecha */}
          {pasoActual === PASOS_AGENDAR.SELECCION_FECHA && (
            <div className="agendar__step">
              <div className="agendar__step-content">
                <Calendario />
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() => {
                    if (seleccion.paciente?.parentesco != null) {
                      setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                    } else {
                      setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
                    }
                  }}
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !fecha ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() =>
                    setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)
                  }
                  disabled={!fecha}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Seleccionar Tipo de Cita */}
          {pasoActual === PASOS_AGENDAR.SELECCION_TIPO_CITA && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">
                {titulos.seleccionTipoCita}
              </h3>
              <div className="agendar__step-content">
                <select
                  className="agendar__select"
                  onChange={handleChangeTipoCita}
                  value={tipoCitaValue}
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {Object.entries(allOpciones.tiposCita).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !tipoCitaValue ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() =>
                    setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)
                  }
                  disabled={!tipoCitaValue}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 5: Seleccionar Especialidad */}
          {pasoActual === PASOS_AGENDAR.SELECCION_ESPECIALIDAD && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">
                {titulos.seleccionEspecialidad}
              </h3>
              <div className="agendar__step-content">
                <select
                  className="agendar__select"
                  onChange={handleChangeEspecialidad}
                  value={especialidadValue}
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {Object.entries(allOpciones.especialidades).map(
                    ([key, val]) => (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() =>
                    setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)
                  }
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !especialidadValue ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
                  disabled={!especialidadValue}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 6: Seleccionar Doctor */}
          {pasoActual === PASOS_AGENDAR.SELECCION_MEDICO && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">{titulos.seleccionDoctor}</h3>
              <div className="agendar__step-content">
                <select
                  className="agendar__select"
                  onChange={handleChangeDoctor}
                  value={doctorValue}
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {Object.entries(allOpciones.doctores).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() =>
                    setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)
                  }
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !doctorValue ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
                  disabled={!doctorValue}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 7: Seleccionar Horario */}
          {pasoActual === PASOS_AGENDAR.SELECCION_HORA && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">
                {titulos.seleccionHorario}
              </h3>
              <div className="agendar__step-content">
                <select
                  className="agendar__select"
                  onChange={handleChangeHorario}
                  value={horarioValue}
                >
                  <option disabled value="">
                    Seleccione una opción
                  </option>
                  {Object.entries(allOpciones.horarios).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
                >
                  Anterior
                </button>
                <button
                  className={`agendar__btn agendar__btn--next ${
                    !horarioValue ? "agendar__btn--disabled" : ""
                  }`}
                  onClick={() => setPasoActual(PASOS_AGENDAR.CONFIRMACION)}
                  disabled={!horarioValue}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {/* Paso 8: Confirmación */}
          {pasoActual === PASOS_AGENDAR.CONFIRMACION && (
            <div className="agendar__step">
              <h3 className="agendar__step-title">{titulos.confirmacion}</h3>
              <div className="agendar__step-content">
                <div className="agendar__resumen">
                  <p>
                    <strong>Paciente:</strong> {paciente.nombre}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {fecha}
                  </p>
                  <p>
                    <strong>Hora:</strong> {hora}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {servicio.tipo}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {profesional.nombre}
                  </p>
                </div>
              </div>
              <div className="agendar__buttons">
                <button
                  className="agendar__btn agendar__btn--prev"
                  onClick={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
                >
                  Anterior
                </button>
                <button
                  className="agendar__btn agendar__btn--confirm"
                  onClick={confirmarCita}
                >
                  Confirmar Cita
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Card - Solo desktop/tablet y NO en confirmación */}
        {mostrarCard() && (
          <div className="agendar__card">
            <CardInfoCita
              cita={{
                cita_id: null,
                tipo_cita: servicio.tipo || "No seleccionado",
                cita_paciente: paciente.nombre || "No seleccionado",
                cita_parentesco: paciente.parentesco || null,
                cita_fecha: fecha || "No seleccionado",
                cita_hora: hora || "No seleccionado",
                cita_doctor: profesional.nombre || "No seleccionado",
                cita_consultorio: profesional.consultorio || "No asignado",
              }}
              isActive={true}
            />
          </div>
        )}
      </div>
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
