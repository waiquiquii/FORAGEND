// dateUtils.js - Utilidades para manejo de fechas y horarios de citas médicas

/**
 * Genera un array de fechas válidas para citas basado en una fecha de inicio
 * @param {string} fechaInicio - Fecha de inicio en formato DD/MM/YYYY
 * @param {number} cantidad - Número de fechas a generar (default: 15)
 * @returns {Array} - Array de fechas en formato DD/MM/YYYY
 */

let cantidadMaxima = null; // Valor por defecto

export const setCantidadMaxima = (nuevaCantidad) => {
  cantidadMaxima = nuevaCantidad;
};

export const getCantidadMaxima = () => cantidadMaxima;

export const generarFechasValidas = (fechaInicio, cantidad ) => {
    const [dia, mes, anio] = fechaInicio.split('/').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const fechasValidas = [];
    
    let diasAgregados = 0;
    while (diasAgregados < cantidad) {
      // Saltar domingos (día 0)
      if (fecha.getDay() !== 0) {
        const diaStr = String(fecha.getDate()).padStart(2, '0');
        const mesStr = String(fecha.getMonth() + 1).padStart(2, '0');
        fechasValidas.push(`${diaStr}/${mesStr}/${fecha.getFullYear()}`);
        diasAgregados++;
      }
      fecha.setDate(fecha.getDate() + 1);
    }
    
    return fechasValidas;
  };
  
  /**
   * Valida si una fecha de cita es válida
   * @param {string} fechaSeleccionada - Fecha a validar (DD/MM/YYYY)
   * @param {string} fechaActual - Fecha actual (DD/MM/YYYY)
   * @returns {boolean} - True si la fecha es válida
   */
  export const validarFechaCita = (fechaSeleccionada, fechaActual) => {
    const [diaSel, mesSel, anioSel] = fechaSeleccionada.split('/').map(Number);
    const [diaAct, mesAct, anioAct] = fechaActual.split('/').map(Number);
    
    const fechaSel = new Date(anioSel, mesSel - 1, diaSel);
    const fechaAct = new Date(anioAct, mesAct - 1, diaAct);
    
    // Validar que no sea domingo
    if (fechaSel.getDay() === 0) return false;
    
    // Calcular diferencia en días
    const diffTime = fechaSel - fechaAct;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Debe ser al menos 2 días en el futuro y máximo 15 días
    return diffDays >= 2 && diffDays <= 15;
  };
  
  /**
   * Genera horarios teóricos de atención cada 30 minutos
   * @param {string} inicio - Hora de inicio (HH:MM)
   * @param {string} fin - Hora de fin (HH:MM)
   * @returns {Array} - Array de horarios en formato HH:MM
   */
  export const generarHorariosAtencion = (inicio = '08:00', fin = '16:00') => {
    const horarios = [];
    let [hora, min] = inicio.split(':').map(Number);
    const [horaFin, minFin] = fin.split(':').map(Number);
    
    while (hora < horaFin || (hora === horaFin && min <= minFin)) {
      const horaStr = String(hora).padStart(2, '0');
      const minStr = String(min).padStart(2, '0');
      horarios.push(`${horaStr}:${minStr}`);
      
      min += 30;
      if (min >= 60) {
        hora++;
        min = min % 60;
      }
    }
    
    return horarios;
  };
  
  /**
   * Filtra citas por tipo y estado
   * @param {Array} citas - Array de citas
   * @param {string} tipoCita - Tipo de cita a filtrar
   * @returns {Array} - Citas filtradas y no canceladas
   */
  export const filtrarCitasPorTipo = (citas, tipoCita) => {
    return citas.filter(cita => 
      cita.tipo === tipoCita && !cita.cancelada
    );
  };
  
  /**
   * Obtiene horarios ocupados para una fecha específica
   * @param {Array} citas - Array de citas
   * @param {string} fecha - Fecha a consultar (DD/MM/YYYY)
   * @returns {Array} - Horarios ocupados en formato HH:MM
   */
  export const obtenerHorariosOcupados = (citas, fecha) => {
    return citas
      .filter(cita => cita.fecha === fecha)
      .map(cita => cita.hora);
  };
  
  /**
   * Calcula horarios disponibles para una fecha
   * @param {Array} horariosAtencion - Horarios teóricos de atención
   * @param {Array} horariosOcupados - Horarios ya ocupados
   * @returns {Array} - Horarios disponibles en formato HH:MM
   */
  export const calcularHorariosDisponibles = (horariosAtencion, horariosOcupados) => {
    return horariosAtencion.filter(
      horario => !horariosOcupados.includes(horario)
    );
  };
  
  /**
   * Valida si un horario está dentro del rango de atención
   * @param {string} horario - Horario a validar (HH:MM)
   * @param {string} inicio - Hora de inicio (HH:MM)
   * @param {string} fin - Hora de fin (HH:MM)
   * @returns {boolean} - True si el horario es válido
   */
  export const validarHorarioAtencion = (horario, inicio = '08:00', fin = '16:00') => {
    const [hora, min] = horario.split(':').map(Number);
    const [horaInicio, minInicio] = inicio.split(':').map(Number);
    const [horaFin, minFin] = fin.split(':').map(Number);
    
    const totalMinutos = hora * 60 + min;
    const totalInicio = horaInicio * 60 + minInicio;
    const totalFin = horaFin * 60 + minFin;
    
    return totalMinutos >= totalInicio && totalMinutos <= totalFin;
  };
  
  /**
   * Función principal para obtener disponibilidad de citas
   * @param {string} fechaSeleccionada - Fecha seleccionada (DD/MM/YYYY)
   * @param {string} tipoCita - Tipo de cita
   * @param {Array} citasAgendadas - Array de citas agendadas
   * @param {Array} horarioAtencion - Horario de atención (ej: ['08:00', '16:00'])
   * @returns {Object} - Objeto con horarios disponibles y ocupados
   */
  export const obtenerDisponibilidadCitas = (
    fechaSeleccionada,
    tipoCita,
    citasAgendadas,
    horarioAtencion = ['08:00', '16:00']
  ) => {
    // 1. Filtrar citas por tipo
    const citasFiltradas = filtrarCitasPorTipo(citasAgendadas, tipoCita);
    
    // 2. Obtener horarios ocupados para la fecha seleccionada
    const horariosOcupados = obtenerHorariosOcupados(citasFiltradas, fechaSeleccionada);
    
    // 3. Generar horarios teóricos de atención
    const [inicio, fin] = horarioAtencion;
    const horariosTeoricos = generarHorariosAtencion(inicio, fin);
    
    // 4. Calcular horarios disponibles
    const horariosDisponibles = calcularHorariosDisponibles(horariosTeoricos, horariosOcupados);
    
    return {
      fecha: fechaSeleccionada,
      horariosDisponibles,
      horariosOcupados,
      horarioAtencion: horariosTeoricos
    };
  };
  
  /**
   * Valida una selección de fecha y horario
   * @param {string} fecha - Fecha seleccionada (DD/MM/YYYY)
   * @param {string} horario - Horario seleccionado (HH:MM)
   * @param {string} fechaActual - Fecha actual (DD/MM/YYYY)
   * @param {Array} horariosOcupados - Horarios ocupados para la fecha
   * @param {Array} horarioAtencion - Horario de atención (ej: ['08:00', '16:00'])
   * @returns {Object} - Objeto con resultado de validación
   */
  export const validarSeleccionCita = (
    fecha,
    horario,
    fechaActual,
    horariosOcupados,
    horarioAtencion = ['08:00', '16:00']
  ) => {
    const errors = [];
    
    // Validar fecha
    if (!validarFechaCita(fecha, fechaActual)) {
      errors.push('La fecha seleccionada no es válida');
    }
    
    // Validar horario dentro de atención
    if (!validarHorarioAtencion(horario, ...horarioAtencion)) {
      errors.push('El horario seleccionado está fuera del horario de atención');
    }
    
    // Validar horario no ocupado
    if (horariosOcupados.includes(horario)) {
      errors.push('El horario seleccionado ya está ocupado');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : null
    };
  };