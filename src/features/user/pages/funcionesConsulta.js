function citasEnCola({ fechaCita }) {
  // lee las citas solicitadas y las citas finalizadas
  // compara las citas solicitadas con las finalizadas
  // devuelve un objeto con las citas en cola (no finalizadas)
  return Object.entries(citasSolicitadas).reduce(
    (citasEnCola, [fecha, cita]) => {
      if (cita.fecha === fechaCita && !finCitas[cita.idCita]) {
        citasEnCola[fecha] = cita;
      }
      return citasEnCola;
    },
    {}
  );
}

function doctoresDisponibles({ citasEnCola, tipoCita }) {
  // lee los doctores y sus horarios
  // lee el tipo de cita que el usuario ha seleccionado
  // segun el tipo de cita, devuelve los doctores disponibles
}

const horariosClinica = {
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
};

const doctores = {
  124353: {
    idPrivado: 1431234,
    nombre: "Dr. Sánchez",
    especialidad: "Ginecología",
    horarios: ["08:00 AM", "08:30 AM", "09:00 AM"],
  },
  124354: {
    idPrivado: 1431235,
    nombre: "Dr. López",
    especialidad: "Pediatría",
    horarios: ["09:30 AM", "10:00 AM", "10:30 AM"],
  },
  124355: {
    idPrivado: 1431236,
    nombre: "Dr. Martínez",
    especialidad: "Dermatología",
    horarios: ["11:00 AM", "11:30 AM", "12:00 PM"],
  },
  124356: {
    idPrivado: 1431237,
    nombre: "Dr. Gómez",
    especialidad: "Cardiología",
    horarios: ["02:00 PM", "02:30 PM", "03:00 PM"],
  },
};

pasientes = {
  448193: {
    idPublico: 254421,
    nombre: "Juan Pérez",
    edad: 30,
    telefono: "123-456-7890",
    email: "juan.perez@example.com",
  },
  448194: {
    idPublico: 254422,
    nombre: "Ana García",
    edad: 28,
    telefono: "987-654-3210",
    email: "ana.garcia@example.com",
  },
  448195: {
    idPublico: 254423,
    nombre: "Luis Martínez",
    edad: 35,
    telefono: "456-789-0123",
    email: "luis.martinez@example.com",
  },
};

const citasSolicitadas = {
  "2023-10-01": {
    idCita: 1441854,
    fecha: "2023-10-01",
    pasiente: 448193,
    hora: "08:00 AM",
    doctor: 124353,
    especialidad: "Ginecología",
  },
  "2023-10-02": {
    idCita: 1441855,
    fecha: "2023-10-02",
    pasiente: 448194,
    hora: "09:30 AM",
    doctor: 124354,
    especialidad: "Pediatría",
  },
  "2023-10-03": {
    idCita: 1441856,
    fecha: "2023-10-03",
    pasiente: 448195,
    hora: "11:00 AM",
    doctor: 124355,
    especialidad: "Dermatología",
  },
  "2023-10-04": {
    idCita: 1441857,
    fecha: "2023-10-04",
    pasiente: 448193,
    hora: "02:00 PM",
    doctor: 124356,
    especialidad: "Cardiología",
  },
};

const finCitas = {
  "2023-10-08": {
    // la cita de la cancelacion/fin
    idCita: 1441854,
    fechaCita: "2023-10-01", // fecha de la cita
    causa: "Cancelación por usuario",
  },
  "2023-10-09": {
    idCita: 1441855,
    fechaCita: "2023-10-02",
    causa: "Finalización de tratamiento",
  },
  "2023-10-10": {
    idCita: 1441856,
    fechaCita: "2023-10-03",
    causa: "Cancelación por el doctor",
  },
};
