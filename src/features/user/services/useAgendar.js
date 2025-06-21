import { doc, setDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { generateIdWithPrefix } from "../../../services/generacionId";

export async function guardarCita(citaData, userUid, idPublicoDoctor) {
  let {
    tipo_cita,
    cita_fecha,
    cita_hora,
    cita_doctor,
    cita_consultorio,
    cita_paciente,
    cita_parentesco,
  } = citaData;

  // Si consultorio es vacío o falsy, asignar "Sin asignar"
  if (!cita_consultorio || cita_consultorio.trim() === "") {
    cita_consultorio = "Sin asignar";
  }

  // Validar campos requeridos
  if (
    !tipo_cita ||
    !cita_fecha ||
    !cita_hora ||
    !cita_doctor ||
    !cita_consultorio ||
    !cita_paciente ||
    !idPublicoDoctor
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
    idPublicoDoctor,
  });

  return idCita;
}
