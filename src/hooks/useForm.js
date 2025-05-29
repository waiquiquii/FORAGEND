import { useState, useEffect, useCallback } from "react";

const useForm = (initialState, validations, onSubmit) => {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback(() => {
    let newErrors = {};

    for (const key in validations) {
      const value = formData[key];

      const fieldValidations = validations[key];

      if (fieldValidations.required && !value) {
        newErrors[key] = "Este campo es obligatorio.";
      } else if (
        fieldValidations.pattern &&
        value &&
        !fieldValidations.pattern.test(value)
      ) {
        newErrors[key] = fieldValidations.errorMessage || "Formato inválido.";
      } else if (fieldValidations.custom && value) {
        const customError = fieldValidations.custom(value, formData);

        if (customError) {
          newErrors[key] = customError;
        }
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }, [formData, validations]);

  useEffect(() => {
    if (isSubmitting) {
      const isValid = validate();

      if (isValid) {
        onSubmit(formData);

        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [formData, isSubmitting, onSubmit, validate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    const fieldValidations = validations[name];

    if (fieldValidations) {
      let newErrors = { ...errors };

      const value = formData[name];

      if (fieldValidations.required && !value) {
        newErrors[name] = "Este campo es obligatorio.";
      } else if (
        fieldValidations.pattern &&
        value &&
        !fieldValidations.pattern.test(value)
      ) {
        newErrors[name] = fieldValidations.errorMessage || "Formato inválido.";
      } else if (fieldValidations.custom && value) {
        const customError = fieldValidations.custom(value, formData);

        if (customError) {
          newErrors[name] = customError;
        } else {
          delete newErrors[name];
        }
      } else {
        delete newErrors[name];
      }

      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
  };

  return {
    formData,

    errors,

    handleChange,

    handleBlur,

    handleSubmit,

    validate,

    isFormValid: Object.keys(errors).length === 0 && !isSubmitting,
  };
};

export default useForm;
