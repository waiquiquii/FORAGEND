import React from "react";
import Calendario from "../components/Calendario";
import "../../../styles/features/user/UserAgendar.css";
import { AgendarCitasProvider } from "../context/AgendarCitasProvider";

export default function UserAgendar() {
  return (
    <AgendarCitasProvider>
      <div className="user-agendar">
        <h2 className="user-agendar__titulo titulo">Agendar una Nueva Cita</h2>
        <div className="user-agendar__calendario">
          <Calendario />
        </div>
        <div className="user-agendar__botones">
          <button className="user-agendar__boton user-agendar__boton--siguiente">
            Siguiente
          </button>
        </div>
      </div>
    </AgendarCitasProvider>
  );
}
