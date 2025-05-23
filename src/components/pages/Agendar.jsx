import React, { useState } from "react";
import "../../styles/Agendar.css"; // Archivo CSS para estilos personalizados
import Home from "../adapters/Home";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    medico: "",
    sintoma: "", // Añadir estado para los síntomas
  });

  const [step, setStep] = useState(0); // Paso del slider (inicialmente 0, significa que aún no se ha llegado al campo de síntoma)

  // Maneja los cambios de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cita solicitada con éxito");
    console.log(formData); // Aquí puedes manejar los datos (enviarlos a un servidor, etc.)
  };

  // Maneja el cambio de paso en el slider
  const handleSliderChange = (e) => {
    setStep(Number(e.target.value)); // Aseguramos que el valor sea un número
  };

  return (
    <Home>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {/* Datos del solicitante */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ingrese su nombre"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Ingrese su correo electrónico"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="Ingrese su número de teléfono"
              />
            </div>
            <div className="form-group">
              <label htmlFor="fecha">Fecha de la cita:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hora">
                Hora de la cita (solo en intervalos de 20 minutos):
              </label>
              <select
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una hora</option>
                <option value="08:00">08:00 AM</option>
                <option value="08:20">08:20 AM</option>
                <option value="08:40">08:40 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:20">09:20 AM</option>
                <option value="09:40">09:40 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:20">10:20 AM</option>
                <option value="10:40">10:40 AM</option>
                <option value="11:00">11:00 AM</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="medico">Seleccionar médico:</label>
              <select
                id="medico"
                name="medico"
                value={formData.medico}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un médico</option>
                <option value="medico1">Dr. Juan Pérez</option>
                <option value="medico2">Dra. Laura Gómez</option>
                <option value="medico3">Dr. Carlos Rodríguez</option>
                <option value="medico3">Dr. Alberto Murillo</option>
                <option value="medico3">Dr. Sofia Perea</option>
                <option value="medico3">Dr. Carlos Ochoa</option>
                <option value="medico3">Dr. Liliana Suarez</option>
              </select>
            </div>
          </div>

          {/* Deslizador para pasar al campo de síntoma */}
          <div className="form-group">
            <label htmlFor="sintomaSlider">
              Desliza para describir tu síntoma:
            </label>
            <input
              type="range"
              id="sintomaSlider"
              name="sintomaSlider"
              min="0"
              max="1"
              value={step}
              onChange={handleSliderChange}
              style={{ width: "100%" }}
            />
          </div>

          {/* Campo de descripción del síntoma, solo visible si el paso es 1 */}
          {step === 1 && (
            <div className="form-group">
              <label htmlFor="sintoma">Descripción del síntoma:</label>
              <textarea
                id="sintoma"
                name="sintoma"
                value={formData.sintoma}
                onChange={handleChange}
                placeholder="Describe tu síntoma"
                required
              />
            </div>
          )}

          {/* Botón de envío */}
          <div className="form-group">
            <button type="submit">Solicitar Cita</button>
          </div>
        </form>
      </div>
    </Home>
  );
};

export default AppointmentForm;
