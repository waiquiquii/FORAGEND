import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

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
  } = formData;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { uid } = userCredential.user;

  const nombre = `${primerNombre} ${primerApellido}`;

  await setDoc(doc(db, "users", uid), {
    email,
    nombre,
    role: "userClient",
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

  return uid;
}
