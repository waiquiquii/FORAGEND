export const PASOS_AGENDAR = {
  SELECCIONAR_PACIENTE: "seleccionarPaciente",
  SELECCIONAR_DEPENDIENTE: "seleccionarDependiente",
  SELECCION_TIPO_CITA: "seleccionTipoCita",
  SELECCION_ESPECIALIDAD: "seleccionEspecialidad",
  SELECCION_MEDICO: "seleccionMedico",
  SELECCION_FECHA: "seleccionFecha",
  SELECCION_HORA: "seleccionHora",
  CONFIRMACION: "confirmacion",
};

// Opciones centralizadas
export const allOpciones = {
  tiposCita: {
    CONSULTA_GENERAL: "Consulta General",
    CONSULTA_ESPECIALIZADA: "Consulta Especializada",
    EXAMEN_MEDICO: "Examen Médico",
  },
  especialidades: {
    MEDICINA_GENERAL: "Medicina General",
    PEDIATRIA: "Pediatría",
    GINECOLOGIA: "Ginecología",
    DERMATOLOGIA: "Dermatología",
  },
  doctores: {
    1: "Dr. Juan Pérez",
    2: "Dra. Ana Gómez",
    3: "Dr. Carlos López",
    4: "Dra. María Rodríguez",
  },
  horarios: {
    turno1: "08:00 AM",
    turno2: "08:30 AM",
    turno3: "09:00 AM",
    turno4: "09:30 AM",
    turno5: "10:00 AM",
    turno6: "10:30 AM",
    turno7: "11:00 AM",
    turno8: "11:30 AM",
    turno9: "12:00 PM",
    turno10: "02:00 PM",
    turno11: "02:30 PM",
    turno12: "03:00 PM",
    turno13: "03:30 PM",
    turno14: "04:00 PM",
    turno15: "04:30 PM",
    turno16: "05:00 PM",
  },
  pacientes: {
    PARA_MI: "Para Mi",
    PARA_OTRO: "Para otro (*dependiente legal)",
  },
};

export const titulos = {
  seleccionPasiente: "Seleccionar Paciente",
  seleccionFecha: "Seleccionar una Fecha",
  seleccionTipoCita: "Seleccionar Tipo de Cita",
  seleccionEspecialidad: "Seleccionar Especialidad",
  seleccionDoctor: "Seleccionar Doctor",
  seleccionHorario: "Seleccionar Horario",
  confirmacion: "Confirmar Cita",
};
