// src/features/auth/pages/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate("/login");
    };
    doLogout();
  }, [logout, navigate]);

  return <p className="p-6">Cerrando sesión...</p>;
}
