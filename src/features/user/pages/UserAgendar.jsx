import React, { useState, useEffect } from "react";
import Calendario from "../components/Calendario";
import "../../styles/features/user/UserAgendar.css";

export default function UserAgendar() {
  return (
    <div className="user-agendar">
      <h2>Agendar una Nueva Cita</h2>
      <div className="user-agendar__calendario">
        <Calendario />
      </div>
      <div className="user-agendar__card"></div>
    </div>
  );
}
