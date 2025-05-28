import React from 'react'
import { PASOS_AGENDAR } from "../../utils/pasosAgendar";

// importacion de componentes
import Calendario from '../elementos/Calendario'
import CardInfoPaciente from '../elementos/CardInfoPaciente';
import CardInfoCita from '../elementos/CardInfoCita';

// importacion de datos de prueba
import citaInfo from '../data/citaInfo.json';

const DetailsAgendar = ({children,pasoActual}) => {

    // Ejemplo de datos de paciente a agendar
    const pacienteAgendar = {
        nombre: "Carlos Ruiz",
        parentesco: "Hijo",
        acudiente: "Marta Ruiz",
        tipoDocumento: "TI",
        numeroDocumento: "11223344"
      }      

    function renderizarCard(pasoActual) {
        if (pasoActual === PASOS_AGENDAR.SELECCIONAR_FECHA.id) {
            return <CardInfoCita cita={citaInfo[0]}/>; // Reemplazar por datos reales
        } else {
            return <CardInfoPaciente datos={pacienteAgendar}/>; // Reemplazar por datos reales
        }
    }



  return (
	<div className='details-agendar'>
        <div className=''>
            <h2 className='details-agendar__title'>{PASOS_AGENDAR.SELECCIONAR_FECHA.title}</h2>
            <Calendario/>
        </div>
        <div>
            <div className='details-agendar__card'>
                {renderizarCard(pasoActual)}
            </div>
            <div className='details-agendar__selectConteiner'>{children}</div>
        </div>
    </div>
  )
}

export default DetailsAgendar
