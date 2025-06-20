// Validación básica de email
const dominiosDeCorreo = [
  "gmail",
  "hotmail",
  "outlook",
  "yahoo",
  "icloud",
  "cesde",
];

export function validateEmail(email) {
  // Validar formato básico de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;

  // Extraer dominio (sin el TLD)
  const match = email.match(/@([^.@]+)\./);
  if (!match) return false;

  const dominio = match[1].toLowerCase();
  return dominiosDeCorreo.includes(dominio);
}

// Validación de contraseña (mínimo 6 caracteres, puedes ajustar)
export function validatePassword(password) {
  return password.length >= 6;
}
