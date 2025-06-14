import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

export async function agendarCita(seleccion) {
  try {
    const auth = getAuth();
    const usuario = auth.currentUser;
    if (!usuario) throw new Error("No autenticado");

    if (!seleccion || !seleccion.profesional) {
      throw new Error("Datos de selección incompletos");
    }

    // 1. Subir resumen a MongoDB Atlas
    const resumen = {
      solicitanteID: usuario.uid,
      medicoID_publica: seleccion.profesional,
    };

    const response = await fetch("http://localhost:3000/api/solicitud_citas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resumen),
    });

    if (!response.ok) throw new Error("Error al guardar en MongoDB");

    const { insertedId } = await response.json();

    // 2. Subir detalle a Firebase
    const db = getFirestore();
    const userRef = doc(db, "users", usuario.uid);

    const detalle = {
      ...seleccion,
      citaID: insertedId,
      fechaAgendada: new Date().toISOString(),
    };

    await updateDoc(userRef, {
      citasAgendadas: arrayUnion(detalle),
    });

    return insertedId;
  } catch (error) {
    console.error("Error al agendar cita:", error);
    throw error;
  }
}
