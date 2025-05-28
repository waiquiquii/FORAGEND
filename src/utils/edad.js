// utils/edad.js

/**
 * Calcula la edad actual a partir de una fecha de nacimiento en formato DD/MM/YYYY
 * @param {string} fechaNacimiento - La fecha de nacimiento como string.
 * @returns {number} - Edad en años.
 */
export function calcularEdad(fechaNacimiento) {
    const [dia, mes, anio] = fechaNacimiento.split("/").map(Number);
    const fechaNac = new Date(anio, mes - 1, dia);
    const hoy = new Date();
  
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
  
    if (mesActual < fechaNac.getMonth() || (mesActual === fechaNac.getMonth() && diaActual < fechaNac.getDate())) {
      edad--;
    }
  
    return edad;
}

/**
 * Verifica si la edad calculada es menor o igual a un valor específico.
 * @param {string} fechaNacimiento
 * @param {number} edadLimite
 * @returns {boolean}
 */
export function esMenorDeEdad(fechaNacimiento, edadLimite = 15) {
return calcularEdad(fechaNacimiento) < edadLimite;
}

/**
 * Verifica si el usuario está en un rango de edad específico
 * @param {string} fechaNacimiento
 * @param {number} edadMin
 * @param {number} edadMax
 * @returns {boolean}
 */
export function estaEnRangoEdad(fechaNacimiento, edadMin, edadMax) {
const edad = calcularEdad(fechaNacimiento);
return edad >= edadMin && edad <= edadMax;
}
  