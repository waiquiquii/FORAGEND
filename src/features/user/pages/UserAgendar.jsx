import React, { useState, useEffect } from "react";
import { PASOS_AGENDAR } from "../services/funcionesAgendar";
import Calendario from "../components/Calendario";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import {
  AgendarCitasProvider,
  useAgendarCitas,
} from "../context/AgendarCitasProvider";
// Importa Firebase
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function UserAgendarContent() {
  const [pasoActual, setPasoActual] = useState(
    PASOS_AGENDAR.SELECCIONAR_PACIENTE
  );
  const { seleccion, actualizarSeleccion } = useAgendarCitas();
  const { fecha, hora, servicio, profesional, paciente } = seleccion;
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");
  const [usuario, setUsuario] = useState({ nombre: "", apellido: "" });

  // Traer usuario de Firebase
  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Suponiendo que tienes una colección "usuarios" con el uid
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsuario({
            nombre: data.nombre || "",
            apellido: data.apellido || "",
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const titulos = {
    seleccionPasiente: "Seleccionar Paciente",
    selecionFecha: "Seleccionar Fecha",
    seleccionTipoCita: "Seleccionar Tipo de Cita",
    seleccionEspecialidad: "Seleccionar Especialidad",
    seleccionDoctor: "Seleccionar Doctor",
    seleccionHorario: "Seleccionar Horario",
    confirmacion: "Confirmar Cita",
  };

  // Funciones para manejar los pasos

  const handleNextFromPaciente = () => {
    let pacienteData = {};
    if (pacienteSeleccionado === "1") {
      pacienteData = {
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        tipo: "titular",
      };
    } else if (pacienteSeleccionado === "2") {
      pacienteData = {
        nombre: "",
        tipo: "dependiente",
      };
    }
    actualizarSeleccion({ paciente: pacienteData });
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

  const opciones = {
    pacientes: allOpciones.pacientes,
    tiposCita: allOpciones.tiposCita,
    especialidades: allOpciones.especialidades,
    doctores: allOpciones.doctores,
    horarios: allOpciones.horarios,
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
                value={pacienteSeleccionado}
                onChange={(e) => setPacienteSeleccionado(e.target.value)}
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
          {/* <Calendario /> */}
          {pasoActual === PASOS_AGENDAR.SELECCION_FECHA && (
            <div className="user-agendar__calendario">
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
          )}
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
