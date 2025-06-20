import React, { useState } from "react";
import { PASOS_AGENDAR } from "../services/funcionesAgendar";
import Calendario from "../components/Calendario";
import FormDependiente from "../components/FormDependiente";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import {
  AgendarCitasProvider,
  useAgendarCitas,
} from "../context/AgendarCitasProvider";
import { useAuth } from "../../../features/auth/context/AuthContext";
import "../../../styles/features/user/UserAgendar.css";

// Opciones centralizadas
const allOpciones = {
  tiposCita: {
    CONSULTA_GENERAL: "Consulta General",
    CONSULTA_ESPECIALIZADA: "Consulta Especializada",
    EXAMEN_MEDICO: "Examen Médico",
  },
  especialidades: {
    MEDICINA_GENERAL: "Medicina General",
    PEDIATRIA: "Pediatría",
    GINECOLOGIA: "Ginecología",
    DERMATOLOGIA: "Dermatología",
  },
  doctores: {
    1: "Dr. Juan Pérez",
    2: "Dra. Ana Gómez",
    3: "Dr. Carlos López",
    4: "Dra. María Rodríguez",
  },
  horarios: {
    turno1: "08:00 AM",
    turno2: "08:30 AM",
    turno3: "09:00 AM",
    turno4: "09:30 AM",
    turno5: "10:00 AM",
    turno6: "10:30 AM",
    turno7: "11:00 AM",
    turno8: "11:30 AM",
    turno9: "12:00 PM",
    turno10: "02:00 PM",
    turno11: "02:30 PM",
    turno12: "03:00 PM",
    turno13: "03:30 PM",
    turno14: "04:00 PM",
    turno15: "04:30 PM",
    turno16: "05:00 PM",
  },
  pacientes: {
    PARA_MI: "Para Mi",
    PARA_OTRO: "Para otro (*dependiente legal)",
  },
};

const titulos = {
  seleccionPasiente: "Seleccionar Paciente",
  seleccionFecha: "Seleccionar una Fecha",
  seleccionTipoCita: "Seleccionar Tipo de Cita",
  seleccionEspecialidad: "Seleccionar Especialidad",
  seleccionDoctor: "Seleccionar Doctor",
  seleccionHorario: "Seleccionar Horario",
  confirmacion: "Confirmar Cita",
};

function UserAgendarContent() {
  const { user } = useAuth();
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const { fecha, hora, servicio, profesional, paciente } = seleccion;
  const [pasoActual, setPasoActual] = useState(
    PASOS_AGENDAR.SELECCIONAR_PACIENTE
  );
  const [dependienteGuardado, setDependienteGuardado] = useState(false);

  // Mostrar card solo en desktop/tablet y NO en confirmación
  const mostrarCard = () => {
    if (pasoActual === PASOS_AGENDAR.CONFIRMACION) return false; // Nunca en confirmación
    if (window.innerWidth <= 768) return false; // Nunca en móvil
    return true; // Solo desktop/tablet en pasos normales
  };

  // Handlers para los cambios en los selects
  const handleChangePaciente = (e) => {
    let nombre = "Usuario";
    if (user) {
      nombre = user.nombre || user.email || "Usuario";
    }
    actualizarSeleccion({
      paciente: {
        ...paciente,
        nombre,
        parentesco: e.target.value === "PARA_OTRO" ? "Dependiente Legal" : null,
      },
    });
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
  const confirmarCita = () => {
    console.log("Cita confirmada:", seleccion);
    alert("¡Cita agendada exitosamente!");
    setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
  };

  return (
    <div className="agendar">
      <h2 className="agendar__title">Agendar una Nueva Cita</h2>

      <div className="agendar__content">
        {/* Formulario */}
        <div className="agendar__form">
          {pasoActual === PASOS_AGENDAR.SELECCIONAR_PACIENTE && (
            <Paso
              titulo={titulos.seleccionPasiente}
              opciones={allOpciones.pacientes}
              onChange={handleChangePaciente}
              onSiguiente={() => {
                setDependienteGuardado(false);
                if (seleccion.paciente?.parentesco === "Dependiente Legal") {
                  setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                } else {
                  setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
                }
              }}
            />
          )}

          {pasoActual === PASOS_AGENDAR.AGREGAR_DEPENDIENTE && (
            <Paso
              componente={
                <FormDependiente
                  onSuccess={() => setDependienteGuardado(true)}
                />
              }
              onAnterior={() =>
                setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE)
              }
              onSiguiente={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
              deshabilitado={!dependienteGuardado}
            />
          )}

          {pasoActual === PASOS_AGENDAR.SELECCION_FECHA && (
            <Paso
              componente={<Calendario />}
              onAnterior={() => {
                if (seleccion.paciente?.parentesco === "Dependiente Legal") {
                  setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                } else {
                  setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
                }
              }}
              onSiguiente={() =>
                setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)
              }
              deshabilitado={!fecha}
            />
          )}

          {pasoActual === PASOS_AGENDAR.SELECCION_TIPO_CITA && (
            <Paso
              titulo={titulos.seleccionTipoCita}
              opciones={allOpciones.tiposCita}
              onChange={handleChangeTipoCita}
              onAnterior={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
              onSiguiente={() =>
                setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)
              }
            />
          )}

          {pasoActual === PASOS_AGENDAR.SELECCION_ESPECIALIDAD && (
            <Paso
              titulo={titulos.seleccionEspecialidad}
              opciones={allOpciones.especialidades}
              onChange={handleChangeEspecialidad}
              onAnterior={() =>
                setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)
              }
              onSiguiente={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
            />
          )}

          {pasoActual === PASOS_AGENDAR.SELECCION_MEDICO && (
            <Paso
              titulo={titulos.seleccionDoctor}
              opciones={allOpciones.doctores}
              onChange={handleChangeDoctor}
              onAnterior={() =>
                setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)
              }
              onSiguiente={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
            />
          )}

          {pasoActual === PASOS_AGENDAR.SELECCION_HORA && (
            <Paso
              titulo={titulos.seleccionHorario}
              opciones={allOpciones.horarios}
              onChange={handleChangeHorario}
              onAnterior={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
              onSiguiente={() => setPasoActual(PASOS_AGENDAR.CONFIRMACION)}
            />
          )}

          {pasoActual === PASOS_AGENDAR.CONFIRMACION && (
            <Paso
              titulo={titulos.confirmacion}
              componente={
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
              }
              onAnterior={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
              onConfirmar={confirmarCita}
            />
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

// Componente simplificado para cada paso
function Paso({
  titulo,
  opciones,
  onChange,
  componente,
  onAnterior,
  onSiguiente,
  onConfirmar,
  deshabilitado,
}) {
  const [seleccion, setSeleccion] = useState("");

  const handleChange = (e) => {
    setSeleccion(e.target.value);
    if (onChange) onChange(e);
  };

  const disabled =
    typeof deshabilitado === "boolean" ? deshabilitado : opciones && !seleccion;

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulo}</h3>

      <div className="agendar__step-content">
        {componente ||
          (opciones && (
            <select
              className="agendar__select"
              onChange={handleChange}
              value={seleccion}
            >
              <option disabled value="">
                Seleccione una opción
              </option>
              {Object.entries(opciones).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          ))}
      </div>

      <div className="agendar__buttons">
        {onAnterior && (
          <button
            className="agendar__btn agendar__btn--prev"
            onClick={onAnterior}
          >
            Anterior
          </button>
        )}
        {onSiguiente && (
          <button
            className={`agendar__btn agendar__btn--next ${
              disabled ? "agendar__btn--disabled" : ""
            }`}
            onClick={onSiguiente}
            disabled={disabled}
          >
            Siguiente
          </button>
        )}
        {onConfirmar && (
          <button
            className="agendar__btn agendar__btn--confirm"
            onClick={onConfirmar}
          >
            Confirmar Cita
          </button>
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
