import mongoose from "mongoose";

const finCitaSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  servicio: { type: String, required: true },
  especialidad: { type: String },
  profesional: { type: String },
  datosUsuario: { type: Object },
  motivoCancelacion: { type: String },
  estado: { type: String, required: true }, // "cancelada" o "finalizada"
  finalizadaEn: { type: Date, default: Date.now },
});

export default mongoose.model("FinCita", finCitaSchema);
