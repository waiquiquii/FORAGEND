import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../../features/auth/context/AuthContext";
import "../../styles/ui/PerfilPersonal.css";

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return "";
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

const PerfilPersonal = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  if (loading) return <div className="perfil-cargando">Cargando perfil...</div>;

  if (!userData)
    return (
      <div className="perfil-error">
        No se encontró información del usuario.
      </div>
    );

  // Extraer datos del perfil
  const { profile = {}, email } = userData;
  const nombreCompleto = `${profile.primerNombre || ""} ${
    profile.segundoNombre || ""
  } ${profile.primerApellido || ""} ${profile.segundoApellido || ""}`
    .replace(/\s+/g, " ")
    .trim();
  const telefono = profile.cel || "";
  const numeroDocumento = profile.numeroDocumento || "";
  const edad = profile.fechaNacimiento
    ? calcularEdad(profile.fechaNacimiento)
    : "";

  return (
    <div className="perfil-tarjeta">
      {/* Sección superior con avatar y nombre */}
      <div className="perfil-cabecera">
        <div className="perfil-avatar-contenedor">
          <img
            src="https://i.pinimg.com/736x/f7/8b/0f/f78b0f2f367d706681d5c657ed167f78.jpg"
            alt="Avatar del usuario"
            className="perfil-avatar"
          />
        </div>
        <div className="perfil-info-principal">
          <h1 className="perfil-nombre">{nombreCompleto || "Usuario"}</h1>
          <p className="perfil-email">{email}</p>
        </div>
      </div>

      {/* Sección de información detallada */}
      <div className="perfil-detalles">
        <h2 className="perfil-seccion-titulo">Información Personal</h2>
        <div className="perfil-grid">
          <div className="perfil-campo">
            <div className="perfil-campo-icono">📱</div>
            <div className="perfil-campo-contenido">
              <span className="perfil-etiqueta">Teléfono</span>
              <span className="perfil-valor">
                {telefono || "No disponible"}
              </span>
            </div>
          </div>
          <div className="perfil-campo">
            <div className="perfil-campo-icono">🆔</div>
            <div className="perfil-campo-contenido">
              <span className="perfil-etiqueta">Documento</span>
              <span className="perfil-valor">
                {numeroDocumento || "No disponible"}
              </span>
            </div>
          </div>
          <div className="perfil-campo">
            <div className="perfil-campo-icono">🎂</div>
            <div className="perfil-campo-contenido">
              <span className="perfil-etiqueta">Edad</span>
              <span className="perfil-valor">
                {edad ? `${edad} años` : "No disponible"}
              </span>
            </div>
          </div>
          <div className="perfil-campo">
            <div className="perfil-campo-icono">✉️</div>
            <div className="perfil-campo-contenido">
              <span className="perfil-etiqueta">Correo electrónico</span>
              <span className="perfil-valor perfil-email-completo">
                {email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección adicional para llenar espacio */}
      <div className="perfil-estadisticas">
        <h2 className="perfil-seccion-titulo">Estado del Perfil</h2>
        <div className="perfil-progreso">
          <div className="perfil-progreso-barra">
            <div className="perfil-progreso-fill"></div>
          </div>
          <span className="perfil-progreso-texto">Perfil completo al 100%</span>
        </div>
        {/* Corazón animado decorativo */}
        <div className="perfil-corazon-container">
          <img
            src="https://i.pinimg.com/originals/6d/e1/7f/6de17f9493638040838c12f4c947365b.gif"
            alt="Corazón animado"
            className="perfil-corazon"
          />
          <p className="perfil-mensaje">¡Tu perfil está completo!</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilPersonal;
