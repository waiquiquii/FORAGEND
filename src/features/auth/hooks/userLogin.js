// Validación básica de email
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validación de contraseña (mínimo 6 caracteres, puedes ajustar)
export function validatePassword(password) {
  return password.length >= 6;
}
