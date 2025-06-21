// src/features/medico/pages/MedicoDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/AuthContext";
import "../../../styles/features/user/medicoDashborad.css";

// Componente hijo: Card de cita individual
function CitaCard({ cita, seleccionado, onSelect, onAceptar, onRechazar }) {
  return (
    <div className="cita-card">
      <input
        type="checkbox"
        checked={seleccionado}
        onChange={() => onSelect(cita.id)}
      />
      <div className="cita-card__info">
        <p>
          <strong>Paciente:</strong> {cita.cita_paciente}
        </p>
        <p>
          <strong>Fecha:</strong> {cita.cita_fecha}
        </p>
        <p>
          <strong>Hora:</strong> {cita.cita_hora}
        </p>
        <p>
          <strong>Motivo:</strong> {cita.tipo_cita}
        </p>
        <p>
          <strong>Consultorio:</strong> {cita.cita_consultorio}
        </p>
      </div>
      <div className="cita-card__acciones">
        <button onClick={() => onAceptar(cita.id)} className="btn btn-aceptar">
          Aceptar
        </button>
        <button
          onClick={() => onRechazar(cita.id)}
          className="btn btn-rechazar"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

// Componente padre: Lista de citas y acciones globales
export default function MedicoDashboard() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  // Cargar citas del médico logueado con estado pendiente
  useEffect(() => {
    if (!user?.id_publico) {
      console.log("No hay idPublico en el usuario:", user);
      return;
    }
    console.log("Buscando citas para idPublicoDoctor:", user.id_publico);
    const cargarCitas = async () => {
      try {
        const q = query(
          collection(db, "citas"),
          where("idPublicoDoctor", "==", user.id_publico),
          where("cita_estado", "==", "pendiente")
        );
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCitas(docs);
      } catch (error) {
        setCitas([]);
      }
    };
    cargarCitas();
  }, [user?.idPublico]);

  // Seleccionar/deseleccionar una cita
  const handleSelect = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  // Seleccionar/deseleccionar todas
  const handleSelectAll = () => {
    if (seleccionadas.length === citas.length) {
      setSeleccionadas([]);
    } else {
      setSeleccionadas(citas.map((c) => c.id));
    }
  };

  // Actualizar estado de una cita en Firestore
  const actualizarEstadoCita = async (id, nuevoEstado) => {
    try {
      await updateDoc(doc(db, "citas", id), {
        cita_estado: nuevoEstado,
      });
      setCitas((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      alert("Error al actualizar la cita: " + error.message);
    }
  };

  // Aceptar/rechazar una cita
  const handleAceptar = (id) => {
    actualizarEstadoCita(id, "agendada");
  };
  const handleRechazar = (id) => {
    actualizarEstadoCita(id, "rechazada");
  };

  // Aceptar/rechazar todas las seleccionadas
  const handleAceptarSeleccionadas = () => {
    seleccionadas.forEach((id) => handleAceptar(id));
    setSeleccionadas([]);
  };
  const handleRechazarSeleccionadas = () => {
    seleccionadas.forEach((id) => handleRechazar(id));
    setSeleccionadas([]);
  };

  return (
    <div className="dashboard-medico">
      <h2>Bienvenido al Dashboard Médico</h2>
      <div className="dashboard-medico__acciones">
        <input
          type="checkbox"
          checked={seleccionadas.length === citas.length && citas.length > 0}
          onChange={handleSelectAll}
        />
        <span>Seleccionar todas</span>
        <button
          className="btn btn-aceptar"
          onClick={handleAceptarSeleccionadas}
          disabled={seleccionadas.length === 0}
        >
          Aceptar seleccionadas
        </button>
        <button
          className="btn btn-rechazar"
          onClick={handleRechazarSeleccionadas}
          disabled={seleccionadas.length === 0}
        >
          Rechazar seleccionadas
        </button>
      </div>
      <div className="dashboard-medico__lista">
        {citas.map((cita) => (
          <CitaCard
            key={cita.id}
            cita={cita}
            seleccionado={seleccionadas.includes(cita.id)}
            onSelect={handleSelect}
            onAceptar={handleAceptar}
            onRechazar={handleRechazar}
          />
        ))}
      </div>
    </div>
  );
}
