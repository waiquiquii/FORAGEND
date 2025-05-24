import React, { useState, useEffect } from "react";
import Home from "../adapters/Home";
import Calendario from "../elementos/Calendario";
import CardInfoCita from "../elementos/CardInfoCita";
import citaInfo from "../../data/citaInfo.json"; // Importa los datos de las citas

import "../../styles/Inicio.css";


function Inicio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = citaInfo.length;

  // Función para manejar el movimiento del carrusel
  const handleMove = (direction) => {
    if (direction === "next") {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalCards);
    } else {
      setActiveIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    }
  };

  // Opcional: Navegación con teclado (flechas izquierda/derecha)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleMove("next");
      } else if (event.key === "ArrowLeft") {
        handleMove("prev");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalCards]); // Las dependencias aseguran que el efecto se re-ejecute si totalCards cambia

  // Función principal para calcular las transformaciones 3D de cada tarjeta
  const getCardTransform = (index) => {
    const offset = index - activeIndex;
    const distance = Math.abs(offset);

    // Valores de transformación base para el efecto 3D
    const translateXBase = 250;
    const scaleBase = 0.8;
    const rotateYBase = 25;
    const translateZBase = -150;
    // Ajustes para el número de tarjetas visibles a cada lado de la central
    const visibleSideCards = 1;

    if (distance === 0) {
      // Tarjeta activa (centro)
      return {
        transform: "translateX(0) scale(1) rotateY(0deg) translateZ(0)",
        opacity: 1,
        zIndex: 5,
        pointerEvents: 'auto' // Permitir clics en la tarjeta activa
      };
    } else if (distance <= visibleSideCards) {
      // Tarjetas adyacentes (a la izquierda o derecha de la activa)
      const direction = offset > 0 ? 1 : -1; // 1 para derecha, -1 para izquierda
      return {
        transform: `translateX(${direction * translateXBase}px) scale(${scaleBase}) rotateY(${direction * -rotateYBase}deg) translateZ(${translateZBase}px)`,
        opacity: 0.7,
        zIndex: 4 - distance, // Z-index decreciente para que las más lejanas estén más atrás
        pointerEvents: 'auto' // Permitir clics en las tarjetas adyacentes
      };
    } else {
      // Tarjetas más alejadas o fuera de vista
      // Las posicionamos fuera del campo de visión y las hacemos invisibles
      const direction = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * (translateXBase * (visibleSideCards + 1))}px) scale(0.6) rotateY(${direction * -40}deg) translateZ(-300px)`,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none' // Deshabilitar clics en tarjetas invisibles
      };
    }
  };


  return (
    <Home>
      <div className="inicio">
        <div className="inicio-cards-container">
          <div className="carousel">
            {citaInfo.map((cita, index) => {
              const transformStyle = getCardTransform(index);
              return (
                <CardInfoCita
                  key={cita.cita_id || index} // Asegúrate de tener un cita_id único o usa index
                  cita={cita} // Pasa los datos de la cita a la tarjeta
                  isActive={index === activeIndex} // Indica si es la tarjeta activa
                  style={transformStyle} // Pasa los estilos calculados para las transformaciones 3D
                  onClick={() => setActiveIndex(index)} // Hace que al hacer clic en una tarjeta, se vuelva la activa
                />
              );
            })}
          </div>
          {/* Controles del carrusel */}
          {totalCards > 1 && ( // Muestra los botones solo si hay más de una tarjeta
            <div className="carousel-controls">
              <button onClick={() => handleMove("prev")} className="carousel-control-button prev">
                &#9664; {/* Flecha izquierda Unicode */}
              </button>
              <button onClick={() => handleMove("next")} className="carousel-control-button next">
                &#9654; {/* Flecha derecha Unicode */}
              </button>
            </div>
          )}
        </div>
        <div className="banner-calendario">
          <Calendario />
        </div>
      </div>
    </Home>
  );
}

export default Inicio;
