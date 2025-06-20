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
      return null;
    },
  },
};

export default dependienteValidations;
