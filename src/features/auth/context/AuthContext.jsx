// Importa los hooks de React y funciones de Firebase necesarias
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para el usuario autenticado y el estado de carga
  const [user, setUser] = useState(null); // { uid, email, role, nombre }
  const [loading, setLoading] = useState(true);

  // Efecto para escuchar cambios en el estado de autenticación
  useEffect(() => {
    // Suscribe al listener de cambios de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          // Busca el documento del usuario en Firestore
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            // Si existe, actualiza el estado del usuario con los datos de Firestore
            const userData = docSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: userData.role,
              nombre: userData.nombre || "",
              id_publico: userData.idPublico || "",
            });
          } else {
            // Si no existe el documento, muestra advertencia y limpia el usuario
            console.warn("Documento de usuario no encontrado.");
            setUser(null);
          }
        } catch (error) {
          // Maneja errores al leer Firestore
          console.error("Error al leer datos de Firestore:", error);
          setUser(null);
        }
      } else {
        // Si no hay usuario autenticado, limpia el usuario
        setUser(null);
      }
      setLoading(false);
    });

    // Limpia el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  // Provee el contexto a los componentes hijos
  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
