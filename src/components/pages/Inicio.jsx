import React from "react";
import Home from "../adapters/Home";
import Calendario from "../elementos/Calendario";
import CardInfoCita from "../cards/CardInfoCita";

function Inicio() {
  return (
    <Home>
      <div className="inico">
        <div className="inicio-cuerpo">
          <CardInfoCita />
        </div>
        <div className="banner-calendario">
          <Calendario />
        </div>
      </div>
    </Home>
  );
}

export default Inicio;
