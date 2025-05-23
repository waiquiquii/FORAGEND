import React from "react";
import MenuVertical from "../elementos/Menuvertical";
import BarraSuperior from "../elementos/BarraSuperior";

import "../../styles/Home.css";

function Home({ children }) {
  return (
    <div className="home-container">
      <MenuVertical />
      <div className="main-content">
        <BarraSuperior />
        <div className="contenido">{children}</div>
        <div className="footer">
          <p>© 2023 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
