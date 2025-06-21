import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../auth/firebase";
import "../../../styles/features/user/usuariosDashborad.css";

function UserCard({ user }) {
  return (
    <div className="usuarios-dashboard__card">
      <div className="usuarios-dashboard__info">
        <p className="usuarios-dashboard__campo">
          <strong>Nombre:</strong> {user.nombre || "Sin nombre"}
        </p>
        <p className="usuarios-dashboard__campo">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="usuarios-dashboard__campo">
          <strong>Rol:</strong> {user.role}
        </p>
        <p className="usuarios-dashboard__campo">
          <strong>UID:</strong> {user.uid}
        </p>
      </div>
    </div>
  );
}

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const users = snapshot.docs
          .map((doc) => ({
            uid: doc.id,
            ...doc.data(),
          }))
          .filter((user) => user.role !== "admin");
        setUsuarios(users);
      } catch (error) {
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <div className="usuarios-dashboard">
      <h2 className="usuarios-dashboard__titulo">Usuarios Registrados</h2>
      {loading ? (
        <p className="usuarios-dashboard__mensaje">Cargando usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p className="usuarios-dashboard__mensaje">
          No hay usuarios registrados.
        </p>
      ) : (
        <div className="usuarios-dashboard__lista">
          {usuarios.map((user) => (
            <UserCard key={user.uid} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
