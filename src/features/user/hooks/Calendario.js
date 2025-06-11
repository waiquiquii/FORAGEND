const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function esDiaHabil({ dia, mes, año, config }) {
  if (!config) return false;
  const fecha = new Date(año, mes, dia);
  const nombreDia = diasSemana[fecha.getDay()];
  return !config.configuracion.dias_descanso.includes(nombreDia);
}

export function getDiasHabilesPermitidos({ hoy, config, maxDiasHabiles }) {
  let diasHabilesContados = 0;
  let fechaIter = new Date(hoy);
  const diasHabilesPermitidos = [];
  while (diasHabilesContados < maxDiasHabiles) {
    const nombreDia = diasSemana[fechaIter.getDay()];
    if (!config?.configuracion.dias_descanso.includes(nombreDia)) {
      diasHabilesPermitidos.push(fechaIter.toISOString().slice(0, 10));
      diasHabilesContados++;
    }
    fechaIter.setDate(fechaIter.getDate() + 1);
  }
  return diasHabilesPermitidos;
}

export function verificaRestricciones({
  dia,
  mes,
  año,
  config,
  fechaDeHoy,
  minDiasAnticipacion,
  diasHabilesPermitidos,
}) {
  const fechaSeleccionada = new Date(año, mes, dia, 23, 59, 59);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const esAnteriorAHoy = fechaSeleccionada < hoy;
  const habil = esDiaHabil({ dia, mes, año, config });
  const diffMs = fechaSeleccionada - hoy;
  const diffDias = diffMs / (1000 * 60 * 60 * 24);
  const menosDeAnticipacion = diffDias < minDiasAnticipacion;
  const fechaStr = fechaSeleccionada.toISOString().slice(0, 10);
  const fueraDeRangoHabiles = !diasHabilesPermitidos.includes(fechaStr);

  return {
    deshabilitado:
      esAnteriorAHoy || !habil || menosDeAnticipacion || fueraDeRangoHabiles,
    habil,
    fechaSeleccionada,
  };
}
