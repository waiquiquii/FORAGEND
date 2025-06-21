import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../auth/firebase";
import { useAuth } from "../../auth/context/AuthContext";
import CardInfoCita from "../../../components/ui/CardInfoCita";
import "../../../styles/features/user/UserMisCitas.css";

function MedicoCitasContent({ citas }) {
  if (citas.length === 0) {
    return (
      <div className="misCitas">
        <h2 className="misCitas__title">Citas Asignadas</h2>
        <div className="misCitas__content">
          <div className="misCitas__cards">
            <div className="misCitas__empty">
              <span className="misCitas__empty-icon">📅</span>
              <p className="misCitas__empty-text">No tienes citas asignadas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="misCitas">
      <h2 className="misCitas__title">Citas Asignadas</h2>
      <div className="misCitas__content">
        <div className="misCitas__cards">
          <div className="misCitas__scroll-container">
            {citas.map((cita) => (
              <div key={cita.cita_id} className="misCitas__card-item">
                <CardInfoCita
                  cita={cita}
                  isActive={false}
                  otrasClasesParaCard="misCitas__card"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MedicoMisCitas() {
  const { user } = useAuth();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id_publico) {
      setCitas([]);
      setLoading(false);
      return;
    }

    const fetchCitas = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "citas"),
          where("idPublicoDoctor", "==", user.id_publico),
          where("cita_estado", "==", "agendada")
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

  return <MedicoCitasContent citas={citas} />;
}
