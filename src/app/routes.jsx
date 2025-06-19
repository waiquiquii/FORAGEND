import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import Logout from "../features/auth/pages/Logout";
import RegistroPage from "../features/auth/pages/RegistroPage";
import RecuperarPassword from "../features/auth/pages/RecuperarPassword";
import NotFound from "../features/auth/componets/layout/NotFound";
import PrivateRoute from "../features/auth/componets/PrivateRoute";

// Layouts
import AdminLayout from "../components/layout/AdminLayout";
import MedicoLayout from "../components/layout/MedicoLayout";
import UserLayout from "../components/layout/UserLayout";

// Páginas Admin
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminUsuarios from "../features/admin/pages/AdminUsuarios";
import AdminConfiguracion from "../features/admin/pages/AdminConfiguracion";

// Páginas Médico
import MedicoDashboard from "../features/medico/pages/MedicoDashboard";
import MedicoCitas from "../features/medico/pages/MedicoCitas";
import MedicoPerfil from "../features/medico/pages/MedicoPerfil";

// Páginas Usuario
import UserAgendar from "../features/user/pages/UserAgendar";
import UserMisCitas from "../features/user/pages/UserMisCitas";
import UserPerfil from "../features/user/pages/UserPerfil";
import ConsultaPruebaMedico from "../features/user/pages/ConsultaPruebaMedico";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirección desde la raíz */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Rutas públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/recuperar" element={<RecuperarPassword />} />
      <Route path="/logout" element={<Logout />} />

      {/* Rutas Admin protegidas */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="configuracion" element={<AdminConfiguracion />} />
        </Route>
      </Route>

      {/* Rutas Médico protegidas */}
      <Route element={<PrivateRoute allowedRoles={["medico"]} />}>
        <Route path="/medico" element={<MedicoLayout />}>
          <Route index element={<MedicoDashboard />} />
          <Route path="dashboard" element={<MedicoDashboard />} />
          <Route path="citas" element={<MedicoCitas />} />
          <Route path="perfil" element={<MedicoPerfil />} />
        </Route>
      </Route>

      {/* Rutas Usuario protegidas */}
      <Route element={<PrivateRoute allowedRoles={["cliente"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserMisCitas />} />
          <Route path="agendar" element={<UserAgendar />} />
          <Route path="mis-citas" element={<UserMisCitas />} />
          <Route path="perfil" element={<UserPerfil />} />
          <Route path="consulta-medicos" element={<ConsultaPruebaMedico />} />
        </Route>
      </Route>

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
