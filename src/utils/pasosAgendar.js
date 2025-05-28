import tipoCita from "../data/tipoCita.json";

export const OPCION_DEFAULT = {
  default: "seleccionar",
};

function crearOpcionesSolicitante() {
  return {
    ...OPCION_DEFAULT,
    PARA_MI: "Para mi",
    PARA_HIJO: "Para mi hijo",
    PARA_OTRO: "Otra persona a mi cargo",
  };
}

function crearOpcionesTipoCita() {
  return {
    ...OPCION_DEFAULT,
    GENERAL: tipoCita.general.nombre,
    CONTROL: tipoCita.control.nombre,
    ESPECIALISTA: tipoCita.especialista.nombre,
  };
}

function crearOpcionesSubTipoCita(subTipos) {
  return {
    ...OPCION_DEFAULT,
    CARDIOLOGIA: subTipos.cardiologia.nombre,
    GINECOLOGIA: subTipos.ginecologia.nombre,
    PEDIATRIA: subTipos.pediatria.nombre,
    PSIQUIATRIA: subTipos.psicologia.nombre,
    DERMATOLOGIA: subTipos.dermatologia.nombre,
    ODONTOLOGIA: subTipos.odontologia.nombre,
  };
}

export const PASOS_AGENDAR = {
  SELECCIONAR_SOLICITANTE: {
    id: "SELECCIONAR_SOLICITANTE",
    title: "Seleccionar solicitante",
    description: "Selecciona el solicitante de la cita",
    opciones: crearOpcionesSolicitante(),
  },
  AGREGAR_ACUDIENTE: {
    id: "AGREGAR_ACUDIENTE",
    title: "Agregar acudiente",
    description: "Agrega los datos del acudiente",
    opciones: null,
  },
  AGREGAR_DEPENDIENTE: {
    id: "AGREGAR_DEPENDIENTE",
    title: "Agregar dependiente",
    description: "Agrega los datos del dependiente",
    opciones: null,
  },
  SELECCIONAR_FECHA: {
    id: "SELECCIONAR_FECHA",
    title: "seleccionar un día",
    description: "seleccionar un día para la cita",
    opciones: null,
  },
  SELECCIONAR_TIPO_CITA: {
    id: "SELECCIONAR_TIPO_CITA",
    title: "Seleccionar tipo de cita",
    description: "Selecciona el tipo de cita",
    opciones: crearOpcionesTipoCita(),
  },
  SELECCIONAR_SUB_TIPO_CITA: {
    id: "SELECCIONAR_SUB_TIPO_CITA",
    title: "Seleccionar sub-tipo de cita",
    description: "Selecciona el sub-tipo de cita",
    opciones: crearOpcionesSubTipoCita(tipoCita.especialista.subTipos),
  },
  SELECCIONAR_HORA: {
    id: "SELECCIONAR_HORA",
    title: "Seleccionar hora",
    description: "Selecciona la hora de la cita",
    opciones: { ...OPCION_DEFAULT },
  },
  CONFIRMAR: {
    id: "CONFIRMAR",
    title: "Verificar detalles de la cita",
    description: "",
    opciones: null,
  },
};

