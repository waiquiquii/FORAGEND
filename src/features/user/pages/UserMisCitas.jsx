// UserMisCitas.jsx - Scroll Horizontal en Todos los Dispositivos
import { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../features/auth/firebase";
import { useAuth } from "../../../features/auth/context/AuthContext";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import CalendarioInfo from "../../../components/ui/CalendarioInfo";
import "../../../styles/features/user/UserMisCitas.css";

// Componente hijo: solo renderiza la UI cuando las citas ya están cargadas
function MisCitasContent({ citas }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollContainerRef = useRef(null);

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
    const newIndex = activeIndex === 0 ? citas.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    scrollToCard(newIndex);
  };

  // Navegación siguiente
  const nextSlide = () => {
    const newIndex = activeIndex === citas.length - 1 ? 0 : activeIndex + 1;
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
      currentIndex < citas.length
    ) {
      setActiveIndex(currentIndex);
    }
  };

  // Usar scroll en el mount inicial
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollToCard(activeIndex);
    }
    // eslint-disable-next-line
  }, []);

  if (citas.length === 0) {
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
          <div
            className="misCitas__scroll-container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {citas.map((cita, index) => (
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
          {!isMobile && citas.length > 1 && (
            <div className="misCitas__navigation">
              <button
                className="misCitas__nav-btn misCitas__nav-btn--prev"
                onClick={prevSlide}
                aria-label="Cita anterior"
              >
                ‹
              </button>
              <div className="misCitas__indicators">
                {citas.map((_, index) => (
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

export default function UserMisCitas() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCitas([]);
      setLoading(false);
      return;
    }

    const fetchCitas = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "citas"),
          where("userUid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const citasData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          cita_id: doc.id,
        }));
        setCitas(citasData);
      } catch (error) {
        setCitas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, [user]);

  if (loading) {
    return <div className="misCitas__loading">Cargando citas...</div>;
  }

  return <MisCitasContent citas={citas} />;
}
