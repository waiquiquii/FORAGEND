import { doc, setDoc } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { generateIdWithPrefix } from "../../../services/generacionId";

// Calcula edad desde fecha de nacimiento
function calculateAge(fechaNacimiento) {
  const today = new Date();
  const birthDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export async function registerDependiente(formData, userUid) {
  const {
    nombres,
    primerApellido,
    segundoApellido,
    parentesco,
    tipoIdentificacion,
    numeroIdentificacion,
    fechaNacimiento,
  } = formData;

  // Validar campos requeridos
  if (
    !nombres ||
    !primerApellido ||
    !segundoApellido ||
    !parentesco ||
    !tipoIdentificacion ||
    !numeroIdentificacion ||
    !fechaNacimiento
  ) {
    throw new Error("Todos los campos obligatorios deben estar llenos.");
  }

  const age = calculateAge(fechaNacimiento);
  if (age < 0) {
    throw new Error("Fecha de nacimiento inválida.");
  }

  // El id del documento será generado por el padre (userUid) y un id público
  const idPublico = generateIdWithPrefix({ prefix: "dep" });

  // Puedes guardar el dependiente bajo una subcolección del usuario, o en una colección general
  await setDoc(doc(db, "usersDependientes", idPublico), {
    idPublico,
    nombre: `${nombres} ${primerApellido}`,
    userUid,
    profile: {
      nombres,
      primerApellido,
      segundoApellido,
      parentesco,
      tipoIdentificacion,
      numeroIdentificacion,
      fechaNacimiento,
    },
  });

  return idPublico;
}
