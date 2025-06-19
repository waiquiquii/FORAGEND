import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { generateIdWithPrefix } from "../../../services/generacionId";

// Helper to calculate age from birthdate (expects 'YYYY-MM-DD')
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

// Helper to determine tipoDocumento by age
function getTipoDocumentoByAge(age) {
  if (age < 18) return "TI"; // Tarjeta de Identidad
  if (age < 12) return "ERROR"; // Error, no se puede registrar
  return "CC"; // Cédula de Ciudadanía
}

export async function registerUser(formData) {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    numeroDocumento,
    fechaNacimiento,
    cel,
    email,
    password,
  } = formData;

  // Validar que todos los campos requeridos estén llenos
  if (
    !primerNombre ||
    !primerApellido ||
    !segundoApellido ||
    !numeroDocumento ||
    !fechaNacimiento ||
    !cel ||
    !email ||
    !password
  ) {
    throw new Error("Todos los campos obligatorios deben estar llenos.");
  }

  const age = calculateAge(fechaNacimiento);

  if (age < 15) {
    throw new Error("Debes tener al menos 15 años para registrarte.");
  }

  const tipoDocumento = getTipoDocumentoByAge(age);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { uid } = userCredential.user;

  const nombre = `${primerNombre} ${primerApellido}`;

  const idPublico = generateIdWithPrefix({ prefix: "user" });

  await setDoc(doc(db, "users", uid), {
    idPublico,
    email,
    nombre,
    role: "cliente",
    createdAt: serverTimestamp(),
    profile: {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      cel,
    },
  });

  // await setDoc(doc(db, "usersDependientes", uid), {
  //   idPublico: generateIdWithPrefix("dep"),
  //   profile: {
  //     primerNombre,
  //     segundoNombre,
  //     primerApellido,
  //     segundoApellido,
  //     tipoDocumento,
  //     parentesco,
  //     numeroDocumento,
  //     fechaNacimiento,
  //   },
  // });

  return uid;
}
