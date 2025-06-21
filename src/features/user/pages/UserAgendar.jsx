import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
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
import { db } from "../../../features/auth/firebase";
import "../../../styles/features/user/UserAgendar.css";

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
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const fecha = seleccion.fecha;

  const handleChange = (nuevaFecha) => {
    actualizarSeleccion({ fecha: nuevaFecha });
  };

  return (
    <div className="agendar__step">
      <div className="agendar__step-content">
        <Calendario onChange={handleChange} value={fecha} />
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
  const doctorValue = profesional?.idPublico || "";

  const handleChange = (e) => {
    const doctor = doctores.find((doc) => doc.idPublico === e.target.value);
    actualizarSeleccion({
      profesional: {
        nombre: doctor?.nombre || "",
        consultorio: doctor?.consultorio || "",
        idPublico: doctor?.idPublico || "",
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
            doctores.map((doctor) => (
              <option key={doctor.idPublico} value={doctor.idPublico}>
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

// Paso 7: Seleccionar Horario (estándar)
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
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState(
    Object.entries(allOpciones.horarios)
  );

  // Traer todos los doctores desde Firebase
  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, "medicosPublicData"),
          where("activo", "==", true)
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => doc.data());
        setDoctores(docs);

        // Especialidades únicas
        const especialidadesUnicas = [
          ...new Set(docs.map((doc) => doc.especialidad)),
        ].filter(Boolean);
        setEspecialidades(especialidadesUnicas);
      } catch (error) {
        setDoctores([]);
        setEspecialidades([]);
      }
    })();
  }, []);

  // Filtrar doctores por especialidad seleccionada
  useEffect(() => {
    if (!servicio?.especialidad) return;
    setDoctores((prev) =>
      prev.filter((doc) => doc.especialidad === servicio.especialidad)
    );
  }, [servicio?.especialidad]);

  // Actualizar el consultorio e idPublico según el médico seleccionado
  useEffect(() => {
    if (!profesional?.idPublico) return;
    const doctorSeleccionado = doctores.find(
      (doc) => doc.idPublico === profesional.idPublico
    );
    if (
      doctorSeleccionado &&
      doctorSeleccionado.consultorio !== profesional.consultorio
    ) {
      actualizarSeleccion({
        profesional: {
          nombre: doctorSeleccionado.nombre,
          consultorio: doctorSeleccionado.consultorio || "",
          idPublico: doctorSeleccionado.idPublico,
        },
      });
    }
    // eslint-disable-next-line
  }, [profesional?.idPublico, doctores]);

  // Horarios estándar (no personalizados por doctor)
  useEffect(() => {
    setHorariosDisponibles(Object.entries(allOpciones.horarios));
  }, []);

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
      console.log({
        citaData,
        userUid: user.uid,
        idPublicoDoctor: profesional.idPublico,
      });

      await guardarCita(citaData, user.uid, profesional.idPublico);
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
          especialidades={especialidades}
          onPrev={() => setPasoActual(PASOS_AGENDAR.SELECCION_TIPO_CITA)}
          onNext={() => setPasoActual(PASOS_AGENDAR.SELECCION_MEDICO)}
        />
      );
      break;
    case PASOS_AGENDAR.SELECCION_MEDICO:
      pasoComponent = (
        <PasoSeleccionarDoctor
          doctores={doctores}
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
                cita_consultorio: (() => {
                  const doctor = doctores.find(
                    (doc) => doc.idPublico === seleccion.profesional?.idPublico
                  );
                  return doctor?.consultorio && doctor.consultorio.trim() !== ""
                    ? doctor.consultorio
                    : "Sin asignar";
                })(),
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
