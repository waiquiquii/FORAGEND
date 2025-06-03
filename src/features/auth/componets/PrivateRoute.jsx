import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Mientras verifica el estado
  if (!user) return <Navigate to="/login" replace />; // Si no hay user, a login
  if (!allowedRoles.includes(user.role)) {
    // Si el user no tiene el rol permitido, redirige (p. ej. a página pública)
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las comprobaciones, renderiza las rutas hijas (<Outlet />)
  return <Outlet />;
};

export default PrivateRoute;
