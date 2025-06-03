import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div>
    <header>
      <h2>FORAGEND</h2>
    </header>
    <main>
      <Outlet /> {/* Aquí se inyectan las páginas hijas */}
    </main>
    <footer>
      <p>&copy; {new Date().getFullYear()} FORAGEND</p>
    </footer>
  </div>
);

export default MainLayout;
