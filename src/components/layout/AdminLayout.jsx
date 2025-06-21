// src/components/layout/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import SideNav from "../ui/SideNav";
import "../../styles/layouts/Layout.css";

const adminNavItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/usuarios", label: "Usuarios" },
];

const AdminLayout = () => {
  return (
    <div className="layout">
      <Header items={adminNavItems} />
      <div className="layout__body">
        <SideNav items={adminNavItems} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
