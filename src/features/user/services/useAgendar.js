import { doc, setDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { generateIdWithPrefix } from "../../../services/generacionId";

export async function guardarCita(citaData, userUid) {
  const {
    tipo_cita,
    cita_fecha,
    cita_hora,
    cita_doctor,
    cita_consultorio,
    cita_paciente,
    cita_parentesco,
  } = citaData;

  // Validar campos requeridos
  if (
    !tipo_cita ||
    !cita_fecha ||
    !cita_hora ||
    !cita_doctor ||
    !cita_consultorio ||
    !cita_paciente
  ) {
    throw new Error("Todos los campos obligatorios deben estar llenos.");
  }

  const idCita = generateIdWithPrefix({ prefix: "cita" });
  const cita_estado = "pendiente";

  await setDoc(doc(db, "citas", idCita), {
    idCita,
    userUid,
    cita_estado,
    tipo_cita,
    cita_fecha,
    cita_hora,
    cita_doctor,
    cita_consultorio,
    cita_paciente,
    cita_parentesco: cita_parentesco || null,
  });

  return idCita;
}
