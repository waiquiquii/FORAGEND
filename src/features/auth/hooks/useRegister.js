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

const dominiosDeCorreo = [
  "gmail",
  "hotmail",
  "outlook",
  "yahoo",
  "icloud",
  "cesde",
];

export async function registerUser(formData) {
  const {
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    tipoDocumento,
    numeroDocumento,
    fechaNacimiento,
    cel,
    email,
    password,
    especialidad,
    fechaReTHUS,
  } = formData;

  // Validar que todos los campos requeridos estén llenos
  if (
    !primerNombre ||
    !primerApellido ||
    !tipoDocumento ||
    !numeroDocumento ||
    !fechaNacimiento ||
    !cel ||
    !email ||
    !password
  ) {
    throw new Error("Todos los campos obligatorios deben estar llenos.");
  }

  // Validar dominio de correo
  const dominio = email.split("@")[1]?.split(".")[0]?.toLowerCase();
  if (!dominiosDeCorreo.includes(dominio)) {
    throw new Error(
      "Solo se permiten correos de los siguientes dominios: " +
        dominiosDeCorreo.join(", ")
    );
  }

  const age = calculateAge(fechaNacimiento);

  if (age < 12) {
    throw new Error("Debes tener al menos 12 años para registrarte.");
  }

  // Validación de tipo de documento según edad
  if (age < 18 && ["CC", "CE"].includes(tipoDocumento)) {
    throw new Error(
      "Un menor de edad no puede tener Cédula de Ciudadanía ni de Extranjería."
    );
  }
  if (age >= 18 && ["TI", "RC"].includes(tipoDocumento)) {
    throw new Error(
      "Un mayor de edad no puede tener Tarjeta de Identidad ni Registro Civil."
    );
  }

  // Asignar rol según dominio
  const role =
    email.endsWith("@cesde.net") || dominio === "cesde" ? "medico" : "cliente";

  // Validar campos obligatorios para médicos
  if (role === "medico" && (!especialidad || !fechaReTHUS)) {
    throw new Error(
      "Especialidad y fecha de inscripción en ReTHUS son obligatorias para médicos."
    );
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { uid } = userCredential.user;

  const nombre = `${primerNombre} ${primerApellido}`;
  const idPublico = generateIdWithPrefix({ prefix: role });
  if (!idPublico) {
    throw new Error("Error al generar el ID público.");
  }

  await setDoc(doc(db, "users", uid), {
    idPublico,
    email,
    nombre,
    role,
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
      ...(role === "medico" ? { especialidad, fechaReTHUS } : {}),
    },
  });

  await setDoc(doc(db, "medicosPublicData", uid), {
    idPublico,
    nombre,
    email,
    uid,
    especialidad,
    activo: false,
    estado: "inactivo",
  });

  return uid;
}
