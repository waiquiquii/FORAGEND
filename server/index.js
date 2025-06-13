import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));

// Definir un esquema y modelo simple
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Crear y guardar un usuario de prueba
const usuarioPrueba = new Usuario({
  nombre: "Elmer",
  email: "elmer@correo.com",
});

usuarioPrueba
  .save()
  .then(() => {
    console.log("Usuario guardado correctamente");
    mongoose.disconnect(); // Cierra la conexión después de guardar
  })
  .catch((err) => {
    console.error("Error al guardar el usuario:", err);
    mongoose.disconnect();
  });
