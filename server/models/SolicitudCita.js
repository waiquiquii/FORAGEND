import mongoose from "mongoose";

const solicitudCitaSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  servicio: { type: String, required: true },
  especialidad: { type: String },
  profesional: { type: String },
  datosUsuario: { type: Object },
  estado: { type: String, default: "pendiente" },
  creadaEn: { type: Date, default: Date.now },
});

export default mongoose.model("SolicitudCita", solicitudCitaSchema);
