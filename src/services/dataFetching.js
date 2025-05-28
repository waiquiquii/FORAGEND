import { validarFechaCita, generarFechasValidas } from './dateUtils..js';
import { whatConsulta, prevHorario, HorarioDeseado } from './tuArchivoPrincipal'; // Donde definiste las funciones de alto nivel

const ejecutarFlujoCitas = async ({fechaActual, fechaSeleccionadaUsuario, tipoCitaDeseada}) => {

  // 1. Validar la fecha inicial
  if (!validarFechaCita(fechaSeleccionadaUsuario, fechaActual)) {
    console.log('La fecha seleccionada inicialmente no es válida.');
    return;
  }

  // 2. Generar un rango de fechas (prevConsulta conceptual)
  const fechasValidas = generarFechasValidas(fechaActual);
  console.log('Fechas válidas para buscar:', fechasValidas);

  // 3. Obtener citas relevantes (whatConsulta)
  const resultWhatConsulta = await whatConsulta(fechasValidas, tipoCitaDeseada);
  console.log('Resultado de whatConsulta:', resultWhatConsulta);

  // 4. Obtener horarios ocupados para una fecha específica (prevHorario)
  const resultPrevHorario = await prevHorario(resultWhatConsulta, fechaSeleccionadaUsuario);
  console.log('Resultado de prevHorario:', resultPrevHorario);

  // 5. Gestionar la selección final de horario (HorarioDeseado)
  const nuevaFechaParaRevisar = '30/05/2025'; // Podría ser la misma o una nueva selección
  const horariosDisponiblesFinal = HorarioDeseado(
    resultPrevHorario,
    resultPrevHorario.horario_atencion_rango,
    nuevaFechaParaRevisar
  );
  console.log('Horarios disponibles finales:', horariosDisponiblesFinal);

  if (horariosDisponiblesFinal && Object.keys(horariosDisponiblesFinal).length > 0) {
    console.log(`¡Cita disponible el ${nuevaFechaParaRevisar} en los siguientes horarios:`, horariosDisponiblesFinal[nuevaFechaParaRevisar]);
  } else {
    console.log('No se encontraron horarios disponibles para la fecha seleccionada.');
  }
};