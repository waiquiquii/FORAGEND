import React from "react";
import MenuVertical from "../elementos/Menuvertical";
import BarraSuperior from "../elementos/BarraSuperior";

import "../../styles/Home.css";

function Home({ children }) {
  return (
    <div className="home-container">
      <BarraSuperior />
      <MenuVertical />
      <div className="main-content">
        <div className="contenido">{children}</div>
        <div className="footer">
          <p>© 2025 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
