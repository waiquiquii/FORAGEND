import { Database } from "@sqlitecloud/drivers";

const db = new Database(
  "sqlitecloud://cuiftdyahz.g5.sqlite.cloud:8860/foragend.sqlite?apikey=m6oXk397Zy6s20oAkewhLlC8qpcXjHfyvkechZVZ0Fo"
);

export const solicitarCitaSqliteCloud = async (citaData) => {
  try {
    const result = await db.sql`
        INSERT INTO citas (id_cita, tipo_cita, especialidad, fecha, hora, paciente, doctor, consultorio)
        VALUES (${citaData.id_cita}, ${citaData.tipo_cita}, ${citaData.especialidad}, ${citaData.fecha}, ${citaData.hora}, ${citaData.paciente}, ${citaData.doctor}, ${citaData.consultorio});
    `;
    return result;
  } catch (error) {
    console.error("Error al solicitar cita:", error);
    throw error;
  }
};

export const obtenerCitasSqliteCloud = async (paciente) => {
  try {
    const result = await db.sql`
        SELECT * FROM citas WHERE paciente = ${paciente};
    `;
    return result;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error;
  }
};
