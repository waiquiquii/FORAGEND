import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";
import "../../../styles/features/user/medicoDashborad.css";

function MedicoCard({ medico, onAceptar, onRechazar }) {
  return (
    <div className="cita-card">
      <div className="cita-card__info">
        <p>
          <strong>Nombre:</strong> {medico.nombre}
        </p>
        <p>
          <strong>Especialidad:</strong> {medico.especialidad}
        </p>
        <p>
          <strong>Email:</strong> {medico.email}
        </p>
        <p>
          <strong>UID:</strong> {medico.uid || "No encontrado"}
        </p>
      </div>
      <div className="cita-card__acciones">
        <button className="btn btn-aceptar" onClick={() => onAceptar(medico)}>
          Aceptar
        </button>
        <button className="btn btn-rechazar" onClick={() => onRechazar(medico)}>
          Rechazar
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [medicosData, setMedicosData] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Primer useEffect: obtener los datos de medicosPublicData (inactivos)
  useEffect(() => {
    const fetchMedicosPublicData = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "medicosPublicData"),
          where("activo", "==", false)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((docSnap) => ({
          idPublico: docSnap.id,
          ...docSnap.data(),
        }));
        setMedicosData(data);
      } catch (error) {
        setMedicosData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicosPublicData();
  }, []);

  // Segundo useEffect: buscar el uid de cada correo en users
  useEffect(() => {
    const fetchUids = async () => {
      if (!medicosData.length) {
        setMedicos([]);
        return;
      }
      setLoading(true);
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        // Mapa de email a uid
        const emailToUid = {};
        usersSnapshot.docs.forEach((u) => {
          const email = u.data().email?.trim().toLowerCase();
          if (email) emailToUid[email] = u.id;
        });

        const medicosConUid = medicosData.map((medico) => {
          const emailKey = medico.email?.trim().toLowerCase();
          const uid = emailToUid[emailKey] || null;
          // Mostrar el UID de cada médico inactivo por consola
          console.log(
            `UID inactivo para ${medico.nombre} (${medico.email}): ${uid}`
          );
          return {
            ...medico,
            uid,
            email: medico.email,
          };
        });
        setMedicos(medicosConUid);
      } catch (error) {
        setMedicos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUids();
  }, [medicosData]);

  // Aceptar médico: actualiza medicosPublicData y añade/actualiza en medicos
  const handleAceptar = async (medico) => {
    try {
      // Verifica que el documento exista antes de actualizar
      const docRef = doc(db, "medicosPublicData", medico.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("El médico ya no existe en medicosPublicData.");
        return;
      }

      // Actualiza medicosPublicData (solo para referencia de estado)
      await updateDoc(docRef, {
        activo: true,
        estado: "activo",
        rechazado: false,
      });

      // Añade o actualiza en medicos usando el UID como ID del documento
      if (medico.uid) {
        await setDoc(doc(db, "medicos", medico.uid), {
          uid: medico.uid,
          email: medico.email,
          nombre: medico.nombre,
          especialidad: medico.especialidad,
          activo: true,
          idPublico: medico.idPublico, // solo referencia
        });
      } else {
        alert("No se encontró el UID del médico. No se puede aceptar.");
        return;
      }

      setMedicos((prev) =>
        prev.filter((m) => m.idPublico !== medico.idPublico)
      );
    } catch (error) {
      alert("Error al aceptar médico: " + error.message);
    }
  };

  // Rechazar médico: actualiza medicosPublicData y elimina de la lista
  const handleRechazar = async (medico) => {
    try {
      // Verifica que el documento exista antes de actualizar
      const docRef = doc(db, "medicosPublicData", medico.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        alert("El médico ya no existe en medicosPublicData.");
        return;
      }

      await updateDoc(docRef, {
        activo: false,
        rechazado: true,
        estado: "rechazado",
      });

      setMedicos((prev) => prev.filter((m) => m.uid !== medico.uid));
    } catch (error) {
      alert("Error al rechazar médico: " + error.message);
    }
  };

  return (
    <div className="dashboard-medico">
      <h2>Revisión de Médicos en Espera</h2>
      {loading ? (
        <p>Cargando médicos...</p>
      ) : medicos.length === 0 ? (
        <p>No hay médicos en espera de revisión.</p>
      ) : (
        <div className="dashboard-medico__lista">
          {medicos.map((medico) => (
            <MedicoCard
              key={medico.idPublico}
              medico={medico}
              onAceptar={handleAceptar}
              onRechazar={handleRechazar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
