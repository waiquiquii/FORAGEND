function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

const dependienteValidations = {
  nombres: {
    required: true,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    errorMessage: "Solo letras y espacios permitidos.",
  },
  primerApellido: {
    required: true,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    errorMessage: "Solo letras y espacios permitidos.",
  },
  segundoApellido: {
    required: false,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
    errorMessage: "Solo letras y espacios permitidos.",
  },
  parentesco: { required: true },
  tipoIdentificacion: { required: true },
  numeroIdentificacion: {
    required: true,
    pattern: /^[0-9]{5,15}$/,
    errorMessage: "Debe ser un número entre 5 y 15 dígitos.",
  },
  fechaNacimiento: {
    required: true,
    custom: (value) => {
      const today = new Date();
      const birthDate = new Date(value);
      if (birthDate > today) {
        return "La fecha de nacimiento no puede ser en el futuro.";
      }
      const eightyYearsAgo = new Date(
        today.getFullYear() - 80,
        today.getMonth(),
        today.getDate()
      );
      if (birthDate < eightyYearsAgo) {
        return "La edad no puede ser mayor a 80 años.";
      }
      return null;
    },
  },
};

export default function validateDependiente(values) {
  const errors = {};

  const edad = calcularEdad(values.fechaNacimiento);

  // Validación de tipo de identificación según edad
  if (edad !== null && edad >= 18) {
    if (["TI", "RC"].includes(values.tipoIdentificacion)) {
      errors.tipoIdentificacion =
        "Un mayor de edad no puede usar Tarjeta de Identidad ni Registro Civil.";
    }
  }
  if (edad !== null && edad < 18) {
    if (["CC", "CE"].includes(values.tipoIdentificacion)) {
      errors.tipoIdentificacion =
        "Un menor de edad no puede usar Cédula de Ciudadanía ni de Extranjería.";
    }
  }

  return errors;
}

export { dependienteValidations, calcularEdad };
