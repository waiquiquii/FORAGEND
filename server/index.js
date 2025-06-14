import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

// Modelos
import SolicitudCita from "./models/SolicitudCita.js";
import FinCita from "./models/FinCita.js";

const app = express();
app.use(cors()); // <--- ¡Esto ya habilita CORS!
app.use(express.json());
