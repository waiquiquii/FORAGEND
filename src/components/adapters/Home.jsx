import React from "react";
import MenuVertical from "../elementos/Menuvertical";
import DropdownMenu from "../elementos/DropdownMenu";

import "../../styles/Home.css";

function Home({ children }) {
  return (
    <div className="home-container">
      <MenuVertical />
      <div className="main-content">
        <div className="barra-superior">
          <div className="logo">LOGO</div>
          <p className="paguina-titulo">FORAGEND</p>
          <DropdownMenu />
        </div>
        <div className="contenido">{children}</div>
        <div className="footer">
          <p>© 2023 Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
