// src/components/layout/MedicoLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import SideNav from "../ui/SideNav";
import "../../styles/layouts/Layout.css";

const medicoNavItems = [
  { to: "/medico/dashboard", label: "Dashboard Médico" },
  { to: "/medico/citas", label: "Mis Citas" },
  { to: "/medico/perfil", label: "Mi Perfil" },
];

const MedicoLayout = () => {
  return (
    <div className="layout">
      <Header items={medicoNavItems} />
      <div className="layout__body">
        <SideNav items={medicoNavItems} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MedicoLayout;
