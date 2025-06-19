// Exporta la función para crear un ID único con prefijo
export function generateIdWithPrefix({ prefix }) {
  const timestamp = Date.now().toString(36); // Base36 para acortar
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`; // Ej: "doctor-kf9ztm-4n7qy"
}
