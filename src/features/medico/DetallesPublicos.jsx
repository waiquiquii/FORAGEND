import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../auth/firebase";

export default function DetallesPublicos({ medico }) {
  const [consultorio, setConsultorio] = useState(medico.consultorio || "");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleGuardar = async () => {
    setGuardando(true);
    setMensaje("");
    try {
      await updateDoc(doc(db, "medicosPublicData", medico.idPublico), {
        consultorio,
      });
      setMensaje("Consultorio actualizado correctamente.");
    } catch (error) {
      setMensaje("Error al actualizar: " + error.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="detalles-publicos">
      <h3>Datos públicos del médico</h3>
      <p>
        <strong>Nombre:</strong> {medico.nombre}
      </p>
      <p>
        <strong>Especialidad:</strong> {medico.especialidad}
      </p>
      <div>
        <label>
          <strong>Consultorio:</strong>{" "}
          <input
            type="text"
            value={consultorio}
            onChange={(e) => setConsultorio(e.target.value)}
            disabled={guardando}
          />
        </label>
        <button onClick={handleGuardar} disabled={guardando || !consultorio}>
          Guardar
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
