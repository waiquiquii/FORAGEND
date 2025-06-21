// src/components/layout/UserLayout.jsx
import React from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import SideNav from "../ui/SideNav";
import "../../styles/layouts/Layout.css";

const userNavItems = [
  { to: "/user/mis-citas", label: "Mis Citas" },
  { to: "/user/agendar", label: "Agendar Cita" },
  { to: "/user/perfil", label: "Mi Perfil" },
];

export default function UserLayout() {
  return (
    <div className="layout">
      <Header items={userNavItems} />
      <div className="layout__body">
        <SideNav items={userNavItems} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}
