// src/features/medico/pages/MedicoDashboard.jsx
import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
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
          <strong>Paciente:</strong> {cita.paciente}
        </p>
        <p>
          <strong>Fecha:</strong> {cita.fecha}
        </p>
        <p>
          <strong>Hora:</strong> {cita.hora}
        </p>
        <p>
          <strong>Motivo:</strong> {cita.motivo}
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
  const [citas, setCitas] = useState([
    {
      id: "1",
      paciente: "Juan Pérez",
      fecha: "2025-06-22",
      hora: "09:00",
      motivo: "Consulta general",
    },
    {
      id: "2",
      paciente: "Ana Gómez",
      fecha: "2025-06-22",
      hora: "10:00",
      motivo: "Control",
    },
    {
      id: "3",
      paciente: "Luis Torres",
      fecha: "2025-06-22",
      hora: "11:00",
      motivo: "Dolor de cabeza",
    },
  ]);
  const [seleccionadas, setSeleccionadas] = useState([]);

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
      // Opcional: Actualizar estado local si tienes las citas en tiempo real
      setCitas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, cita_estado: nuevoEstado } : c))
      );
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
