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
  // Nuevo estado para saber si el dependiente fue guardado
  const [dependienteGuardado, setDependienteGuardado] = useState(false);

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
        parentesco:
          e.target.value === "PARA_OTRO"
            ? "Dependiente Legal"
            : e.target.value === "PARA_MI"
            ? null
            : null,
      },
    });
    console.log("Paciente seleccionado:", e.target.value);
    console.log("Usuario autenticado:", user);
  };

  const handleChangeTipoCita = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        tipo: allOpciones.tiposCita[e.target.value] || e.target.value,
      },
    });
    console.log("Tipo de cita seleccionado:", e.target.value);
  };

  const handleChangeEspecialidad = (e) => {
    actualizarSeleccion({
      servicio: {
        ...servicio,
        especialidad:
          allOpciones.especialidades[e.target.value] || e.target.value,
      },
    });
    console.log("Especialidad seleccionada:", e.target.value);
  };

  const handleChangeDoctor = (e) => {
    actualizarSeleccion({
      profesional: {
        nombre: allOpciones.doctores[e.target.value] || e.target.value,
        consultorio: `consultorio ${e.target.value}`,
      },
    });
    console.log("Doctor seleccionado:", e.target.value);
  };

  const handleChangeHorario = (e) => {
    actualizarSeleccion({
      hora: allOpciones.horarios[e.target.value] || e.target.value,
    });
    console.log("Horario seleccionado:", e.target.value);
  };

  // Funciones para manejar los pasos
  const setPaso = (nuevoPaso) => () => setPasoActual(nuevoPaso);

  return (
    <div className="user-agendar">
      <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
      <div className="user-agendar__contenido">
        <div className="user-agendar__formulario">
          {pasoActual === PASOS_AGENDAR.SELECCIONAR_PACIENTE && (
            <SelectorPaso
              titulo={titulos.seleccionPasiente}
              opciones={allOpciones.pacientes}
              onChange={handleChangePaciente}
              onSiguiente={() => {
                setDependienteGuardado(false); // Reinicia al cambiar de paciente
                if (
                  seleccion.paciente &&
                  seleccion.paciente.parentesco === "Dependiente Legal"
                ) {
                  setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                } else {
                  setPasoActual(PASOS_AGENDAR.SELECCION_FECHA);
                }
              }}
            />
          )}
          {pasoActual === PASOS_AGENDAR.AGREGAR_DEPENDIENTE && (
            <SelectorPaso
              titulo="Agregar Dependiente"
              opciones={null} // No hay opciones, solo un formulario
              componente={
                <FormDependiente
                  onSuccess={() => setDependienteGuardado(true)}
                  // Puedes pasar más props si lo necesitas
                />
              }
              onAnterior={setPaso(PASOS_AGENDAR.SELECCIONAR_PACIENTE)}
              onSiguiente={setPaso(PASOS_AGENDAR.SELECCION_FECHA)}
              // Deshabilita "Siguiente" hasta que el dependiente esté guardado
              siguienteDeshabilitado={!dependienteGuardado}
            />
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_FECHA && (
            <SelectorPaso
              titulo={titulos.seleccionFecha}
              componente={<Calendario />}
              onAnterior={() => {
                if (
                  seleccion.paciente &&
                  seleccion.paciente.parentesco === "Dependiente Legal"
                ) {
                  setPasoActual(PASOS_AGENDAR.AGREGAR_DEPENDIENTE);
                } else {
                  setPasoActual(PASOS_AGENDAR.SELECCIONAR_PACIENTE);
                }
              }}
              onSiguiente={setPaso(PASOS_AGENDAR.SELECCION_TIPO_CITA)}
              siguienteDeshabilitado={!fecha}
            />
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_TIPO_CITA && (
            <SelectorPaso
              titulo={titulos.seleccionTipoCita}
              opciones={allOpciones.tiposCita}
              onChange={handleChangeTipoCita}
              onAnterior={setPaso(PASOS_AGENDAR.SELECCION_FECHA)}
              onSiguiente={setPaso(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)}
            />
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_ESPECIALIDAD && (
            <SelectorPaso
              titulo={titulos.seleccionEspecialidad}
              opciones={allOpciones.especialidades}
              onChange={handleChangeEspecialidad}
              onAnterior={setPaso(PASOS_AGENDAR.SELECCION_TIPO_CITA)}
              onSiguiente={setPaso(PASOS_AGENDAR.SELECCION_MEDICO)}
            />
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_MEDICO && (
            <SelectorPaso
              titulo={titulos.seleccionDoctor}
              opciones={allOpciones.doctores}
              onChange={handleChangeDoctor}
              onAnterior={setPaso(PASOS_AGENDAR.SELECCION_ESPECIALIDAD)}
              onSiguiente={setPaso(PASOS_AGENDAR.SELECCION_HORA)}
            />
          )}
          {pasoActual === PASOS_AGENDAR.SELECCION_HORA && (
            <SelectorPaso
              titulo={titulos.seleccionHorario}
              opciones={allOpciones.horarios}
              onChange={handleChangeHorario}
              onAnterior={setPaso(PASOS_AGENDAR.SELECCION_MEDICO)}
              onSolicitar={setPaso(PASOS_AGENDAR.CONFIRMACION)}
              textoSolicitar="Solicitar"
            />
          )}
        </div>
        <div className="user-agendar__seleccion">
          <div className="user-agendar__card">
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
              otrasClasesParaCard="user-agendar__card-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente reutilizable para cada paso
function SelectorPaso({
  titulo,
  opciones,
  onChange,
  componente,
  onAnterior,
  onSiguiente,
  onSolicitar,
  textoSolicitar = "Siguiente",
  siguienteDeshabilitado, // <-- acepta la prop
}) {
  // Detecta si hay selección (solo si hay opciones)
  const [seleccion, setSeleccion] = useState("");

  const handleChange = (e) => {
    setSeleccion(e.target.value);
    if (onChange) onChange(e);
  };

  // El botón siguiente está deshabilitado si no hay selección y hay opciones,
  // o si se pasa la prop siguienteDeshabilitado como true
  const disabled =
    typeof siguienteDeshabilitado === "boolean"
      ? siguienteDeshabilitado
      : opciones && !seleccion;

  return (
    <div className="user-agendar__selector">
      <h3 className="user-agendar__selector-titulo">{titulo}</h3>
      {componente ||
        (opciones && (
          <Select
            opciones={opciones}
            onChange={handleChange}
            value={seleccion}
          />
        ))}
      <Botones
        anterior={onAnterior}
        siguiente={onSiguiente}
        solicitar={onSolicitar}
        textoSolicitar={textoSolicitar}
        siguienteDeshabilitado={disabled}
      />
    </div>
  );
}

// Botones de navegación
function Botones({
  anterior,
  siguiente,
  solicitar,
  textoSolicitar,
  siguienteDeshabilitado,
}) {
  return (
    <div className="user-agendar__botones">
      {anterior && (
        <button
          className="user-agendar__boton user-agendar__boton--anterior"
          onClick={anterior}
        >
          Anterior
        </button>
      )}
      {siguiente && (
        <button
          className={`user-agendar__boton user-agendar__boton--siguiente${
            siguienteDeshabilitado ? " user-agendar__boton--disabled" : ""
          }`}
          onClick={siguiente}
          disabled={siguienteDeshabilitado}
        >
          Siguiente
        </button>
      )}
      {solicitar && (
        <button
          className="user-agendar__boton user-agendar__boton--solicitar"
          onClick={solicitar}
        >
          {textoSolicitar}
        </button>
      )}
    </div>
  );
}

// Select reutilizable
function Select({ opciones, onChange, value }) {
  return (
    <select className="user-agendar__select" onChange={onChange} value={value}>
      <option disabled value="">
        Seleccione una opción
      </option>
      {Object.entries(opciones).map(([key, value]) => (
        <option key={key} value={key} className="user-agendar__select-option">
          {value}
        </option>
      ))}
    </select>
  );
}

export default function UserAgendar() {
  return (
    <AgendarCitasProvider>
      <UserAgendarContent />
    </AgendarCitasProvider>
  );
}
