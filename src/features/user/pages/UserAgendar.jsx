import React, { useState, useEffect } from "react";
import { Database } from "@sqlitecloud/drivers";
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

const db = new Database(import.meta.env.VITE_SQLITECLOUD_URL_USERCLIENT);

// Paso 1: Seleccionar Paciente
function PasoSeleccionarPaciente({ onNext }) {
  const { user } = useAuth();
  const { seleccion, actualizarSeleccion } = useAgendarCitas();

  const handleChange = (e) => {
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

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulos.seleccionPasiente}</h3>
      <div className="agendar__step-content">
        <select
          className="agendar__select"
          onChange={handleChange}
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
          className={`agendar__btn agendar__btn--next${
            !seleccion.paciente?.nombre ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!seleccion.paciente?.nombre}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 2: Agregar Dependiente
function PasoAgregarDependiente({ onPrev, onNext }) {
  const [dependienteGuardado, setDependienteGuardado] = useState(false);

  return (
    <div className="agendar__step">
      <div className="agendar__step-content">
        <FormDependiente onSuccess={() => setDependienteGuardado(true)} />
      </div>
      <div className="agendar__buttons">
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !dependienteGuardado ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!dependienteGuardado}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 3: Seleccionar Fecha
function PasoSeleccionarFecha({ onPrev, onNext }) {
  const { seleccion } = useAgendarCitas();
  const fecha = seleccion.fecha;

  return (
    <div className="agendar__step">
      <div className="agendar__step-content">
        <Calendario />
      </div>
      <div className="agendar__buttons">
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !fecha ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!fecha}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 4: Seleccionar Tipo de Cita
function PasoSeleccionarTipoCita({ onPrev, onNext }) {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const servicio = seleccion.servicio || {};
  const tipoCitaValue =
    Object.entries(allOpciones.tiposCita).find(
      ([, val]) => val === servicio?.tipo
    )?.[0] || "";

  const handleChange = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        tipo: allOpciones.tiposCita[e.target.value] || e.target.value,
      },
    });
  };

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulos.seleccionTipoCita}</h3>
      <div className="agendar__step-content">
        <select
          className="agendar__select"
          onChange={handleChange}
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
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !tipoCitaValue ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!tipoCitaValue}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 5: Seleccionar Especialidad
function PasoSeleccionarEspecialidad({ especialidades, onPrev, onNext }) {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const servicio = seleccion.servicio || {};
  const especialidadValue = servicio?.especialidad || "";

  const handleChange = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        especialidad: e.target.value,
      },
    });
  };

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulos.seleccionEspecialidad}</h3>
      <div className="agendar__step-content">
        <select
          className="agendar__select"
          onChange={handleChange}
          value={especialidadValue}
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          {especialidades.map((especialidad) => (
            <option key={especialidad} value={especialidad}>
              {especialidad}
            </option>
          ))}
        </select>
      </div>
      <div className="agendar__buttons">
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !especialidadValue ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!especialidadValue}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 6: Seleccionar Doctor
function PasoSeleccionarDoctor({ doctores, onPrev, onNext }) {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const profesional = seleccion.profesional || {};
  const doctorValue = profesional?.nombre || "";

  const handleChange = (e) => {
    actualizarSeleccion({
      profesional: {
        nombre: e.target.value,
        consultorio: "",
      },
    });
  };

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulos.seleccionDoctor}</h3>
      <div className="agendar__step-content">
        <select
          className="agendar__select"
          onChange={handleChange}
          value={doctorValue}
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          {doctores.length === 0 ? (
            <option disabled value="">
              No hay doctores disponibles
            </option>
          ) : (
            doctores.map((doctor, idx) => (
              <option key={idx} value={doctor.nombre}>
                {doctor.nombre}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="agendar__buttons">
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !doctorValue ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!doctorValue}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 7: Seleccionar Horario
function PasoSeleccionarHorario({ horarios, onPrev, onNext }) {
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const hora = seleccion.hora || "";
  const horarioValue =
    Object.entries(allOpciones.horarios).find(([, val]) => val === hora)?.[0] ||
    "";

  const handleChange = (e) => {
    actualizarSeleccion({
      hora: allOpciones.horarios[e.target.value] || e.target.value,
    });
  };

  return (
    <div className="agendar__step">
      <h3 className="agendar__step-title">{titulos.seleccionHorario}</h3>
      <div className="agendar__step-content">
        <select
          className="agendar__select"
          onChange={handleChange}
          value={horarioValue}
        >
          <option disabled value="">
            Seleccione una opción
          </option>
          {horarios.length === 0 ? (
            <option disabled value="">
              No hay horarios disponibles
            </option>
          ) : (
            horarios.map(([key, val]) => (
              <option key={key} value={key}>
                {val}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="agendar__buttons">
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className={`agendar__btn agendar__btn--next${
            !horarioValue ? " agendar__btn--disabled" : ""
          }`}
          onClick={onNext}
          disabled={!horarioValue}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

// Paso 8: Confirmación
function PasoConfirmacion({ onPrev, onConfirmar }) {
  const { seleccion } = useAgendarCitas();
  const { paciente, fecha, hora, servicio, profesional } = seleccion;

  return (
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
        <button className="agendar__btn agendar__btn--prev" onClick={onPrev}>
          Anterior
        </button>
        <button
          className="agendar__btn agendar__btn--confirm"
          onClick={onConfirmar}
        >
          Confirmar Cita
        </button>
      </div>
    </div>
  );
}

// Componente principal
function UserAgendarContent() {
  const { user } = useAuth();
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const { fecha, servicio, profesional, hora } = seleccion;

  const [pasoActual, setPasoActual] = useState(
    PASOS_AGENDAR.SELECCIONAR_PACIENTE
  );
  const [doctoresSQL, setDoctoresSQL] = useState([]);
  const [especialidadesSQL, setEspecialidadesSQL] = useState([]);
  const [respuestaSQL, setRespuestaSQL] = useState({
    doctores: [],
    especialidades: [],
    horarios: [],
  });

  // --- Efectos ---
  // Traer todos los doctores al cargar el componente
  useEffect(() => {
    (async () => {
      try {
        const resultDoctores = await db.sql(`SELECT * FROM doctores`);
        setRespuestaSQL((prev) => ({
          ...prev,
          doctores: resultDoctores,
        }));
        setDoctoresSQL(resultDoctores);
      } catch (error) {
        console.error("Error al obtener doctores:", error);
      }
    })();
  }, []);

  // Obtener especialidades únicas de los doctores al montar el componente
  useEffect(() => {
    const especialidadesUnicas = [
      ...new Set((respuestaSQL.doctores || []).map((doc) => doc.especialidad)),
    ].filter(Boolean);
    setEspecialidadesSQL(especialidadesUnicas);
  }, [respuestaSQL.doctores]);

  // Filtrar doctores por especialidad seleccionada
  useEffect(() => {
    if (!servicio?.especialidad) return;
    setDoctoresSQL(
      (respuestaSQL.doctores || []).filter(
        (doc) => doc.especialidad === servicio.especialidad && doc.activo === 1
      )
    );
  }, [servicio?.especialidad, respuestaSQL.doctores]);

  // actualizar el consultorio segun el medico selecionado

  useEffect(() => {
    if (!profesional?.nombre) return;
    const doctorSeleccionado = (respuestaSQL.doctores || []).find(
      (doc) => doc.nombre === profesional.nombre
    );
    if (
      doctorSeleccionado &&
      doctorSeleccionado.consultorio !== profesional.consultorio
    ) {
      actualizarSeleccion({
        profesional: {
          nombre: doctorSeleccionado.nombre,
          consultorio: doctorSeleccionado.consultorio || "",
        },
      });
    }
    // eslint-disable-next-line
  }, [profesional?.nombre, respuestaSQL.doctores]);

  // Horarios dinámicos según el doctor seleccionado
  const [horariosDisponibles, setHorariosDisponibles] = useState(
    Object.entries(allOpciones.horarios)
  );
  useEffect(() => {
    if (!profesional?.nombre) {
      setHorariosDisponibles(Object.entries(allOpciones.horarios));
      return;
    }
    const doctor = doctoresSQL.find((doc) => doc.nombre === profesional.nombre);
    if (!doctor || !doctor.horarios) {
      setHorariosDisponibles(Object.entries(allOpciones.horarios));
      return;
    }
    const horariosDoctor = Array.isArray(doctor.horarios)
      ? doctor.horarios
      : typeof doctor.horarios === "string"
      ? doctor.horarios.split(",").map((h) => h.trim())
      : [];
    const filtrados = Object.entries(allOpciones.horarios).filter(
      ([key, val]) => horariosDoctor.includes(val)
    );
    setHorariosDisponibles(
      filtrados.length > 0 ? filtrados : Object.entries(allOpciones.horarios)
    );
  }, [profesional?.nombre, doctoresSQL]);

  // Confirmar cita
  const confirmarCita = async () => {
    try {
      const { servicio, fecha, hora, profesional, paciente } = seleccion;
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

  // Mostrar card solo en desktop/tablet y NO en confirmación
  const mostrarCard = () =>
    pasoActual !== PASOS_AGENDAR.CONFIRMACION && window.innerWidth > 768;

  // Render dinámico por paso
  let pasoComponent = null;
  switch (pasoActual) {
    case PASOS_AGENDAR.SELECCIONAR_PACIENTE:
      pasoComponent = (
        <PasoSeleccionarPaciente
          onNext={() => {
            if (seleccion.paciente?.parentesco != null) {
              setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
            } else {
              setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
            }
          }}
        />
      );
      break;
    case PASOS_AGENDAR.AGREGAR_DEPENDIENTE:
      pasoComponent = (
        <PasoAgregarDependiente
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE)}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_FECHA:
      pasoComponent = (
        <PasoSeleccionarFecha
          onPrev={() => {
            if (seleccion.paciente?.parentesco != null) {
              setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
            } else {
              setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
            }
          }}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_TIPO_CITA:
      pasoComponent = (
        <PasoSeleccionarTipoCita
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_FECHA)}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_ESPECIALIDAD:
      pasoComponent = (
        <PasoSeleccionarEspecialidad
          especialidades={especialidadesSQL}
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_MEDICO:
      pasoComponent = (
        <PasoSeleccionarDoctor
          doctores={doctoresSQL}
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_HORA:
      pasoComponent = (
        <PasoSeleccionarHorario
          horarios={horariosDisponibles}
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
          onNext={() => setPasoActual(PASOS_AGENDAR.CONFIRMACION)}
        />
      );
      break;
    case PASOS_AGENDAR.CONFIRMACION:
      pasoComponent = (
        <PasoConfirmacion
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_HORA)}
          onConfirmar={confirmarCita}
        />
      );
      break;
    default:
      pasoComponent = null;
  }

  return (
    <div className="agendar">
      <h2 className="agendar__title">Agendar una Nueva Cita</h2>
      <div className="agendar__content">
        <div className="agendar__form">{pasoComponent}</div>
        {mostrarCard() && (
          <div className="agendar__card">
            <CardInfoCita
              cita={{
                cita_id: null,
                tipo_cita: seleccion.servicio?.tipo || "No seleccionado",
                cita_paciente: seleccion.paciente?.nombre || "No seleccionado",
                cita_parentesco: seleccion.paciente?.parentesco || null,
                cita_fecha: seleccion.fecha || "No seleccionado",
                cita_hora: seleccion.hora || "No seleccionado",
                cita_doctor: seleccion.profesional?.nombre || "No seleccionado",
                cita_consultorio:
                  seleccion.profesional?.consultorio || "No asignado",
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
