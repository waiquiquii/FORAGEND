// UserMisCitas.jsx - Scroll Horizontal en Todos los Dispositivos
import React, { useState, useRef, useEffect } from "react";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import CalendarioInfo from "../../../components/ui/CalendarioInfo";

import "../../../styles/features/user/UserMisCitas.css";

export default function UserMisCitas() {
  const CitasAMostrar = [
    {
      cita_id: "12345",
      tipo_cita: "Consulta General",
      cita_fecha: "2023-10-15",
      cita_hora: "10:00 AM",
      cita_doctor: "Dr. Juan Pérez",
      cita_consultorio: "Consultorio 1",
    },
    {
      cita_id: "67890",
      tipo_cita: "Chequeo Anual",
      cita_fecha: "2023-11-20",
      cita_hora: "2:00 PM",
      cita_doctor: "Dra. Ana Gómez",
      cita_consultorio: "Consultorio 2",
    },
    {
      cita_id: "11223",
      tipo_cita: "Seguimiento",
      cita_fecha: "2023-12-05",
      cita_hora: "11:30 AM",
      cita_doctor: "Dr. Carlos López",
      cita_consultorio: "Consultorio 3",
    },
    {
      cita_id: "44556",
      tipo_cita: "Consulta Especializada",
      cita_fecha: "2023-12-15",
      cita_hora: "3:00 PM",
      cita_doctor: "Dra. María Rodríguez",
      cita_consultorio: "Consultorio 4",
    },
    {
      cita_id: "78901",
      tipo_cita: "Consulta de Seguimiento",
      cita_fecha: "2023-12-20",
      cita_hora: "4:00 PM",
      cita_doctor: "Dr. Luis Martínez",
      cita_consultorio: "Consultorio 5",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollContainerRef = useRef(null);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll a la card activa
  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 16; // var(--spacing-md) en px
    const scrollPosition = index * (cardWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  // Navegación anterior
  const prevSlide = () => {
    const newIndex =
      activeIndex === 0 ? CitasAMostrar.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  // Navegación siguiente
  const nextSlide = () => {
    const newIndex =
      activeIndex === CitasAMostrar.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  // Ir a card específica
  const goToSlide = (index) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  // Detectar scroll manual para actualizar indicador activo
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.offsetWidth || 0;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const currentIndex = Math.round(scrollLeft / (cardWidth + gap));

    if (
      currentIndex !== activeIndex &&
      currentIndex >= 0 &&
      currentIndex < CitasAMostrar.length
    ) {
      setActiveIndex(currentIndex);
    }
  };

  // Usar scroll en el mount inicial
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollToCard(activeIndex);
    }
  }, []);

  // Si no hay citas
  if (CitasAMostrar.length === 0) {
    return (
      <div className="misCitas">
        <h2 className="misCitas__title">Mis Citas</h2>
        <div className="misCitas__content">
          <div className="misCitas__cards">
            <div className="misCitas__empty">
              <span className="misCitas__empty-icon">📅</span>
              <p className="misCitas__empty-text">
                No tienes citas programadas
              </p>
            </div>
          </div>
          {!isMobile && (
            <div className="misCitas__calendar">
              <CalendarioInfo />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="misCitas">
      <h2 className="misCitas__title">Mis Citas</h2>

      <div className="misCitas__content">
        {/* Área de Cards con Scroll Horizontal */}
        <div className="misCitas__cards">
          {/* Contenedor de scroll horizontal */}
          <div
            className="misCitas__scroll-container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {CitasAMostrar.map((cita, index) => (
              <div
                key={cita.cita_id}
                className={`misCitas__card-item ${
                  index === activeIndex ? "misCitas__card-item--active" : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <CardInfoCita
                  cita={cita}
                  isActive={index === activeIndex}
                  otrasClasesParaCard="misCitas__card"
                />
              </div>
            ))}
          </div>

          {/* Navegación - Solo visible en desktop/tablet */}
          {!isMobile && CitasAMostrar.length > 1 && (
            <div className="misCitas__navigation">
              <button
                className="misCitas__nav-btn misCitas__nav-btn--prev"
                onClick={prevSlide}
                aria-label="Cita anterior"
              >
                ‹
              </button>

              <div className="misCitas__indicators">
                {CitasAMostrar.map((_, index) => (
                  <button
                    key={index}
                    className={`misCitas__indicator ${
                      index === activeIndex ? "misCitas__indicator--active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Ir a cita ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="misCitas__nav-btn misCitas__nav-btn--next"
                onClick={nextSlide}
                aria-label="Cita siguiente"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Calendario - Solo visible en desktop/tablet */}
        {!isMobile && (
          <div className="misCitas__calendar">
            <CalendarioInfo />
          </div>
        )}
      </div>
    </div>
  );
}
