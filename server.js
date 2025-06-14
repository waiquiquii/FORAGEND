import "dotenv/config";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const app = express();
app.use(express.json());

// Middleware para autenticar y verificar rol
async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    // Extrae el rol desde customClaims si existe
    req.user = decoded;
    req.user.role = decoded.role || decoded.customClaims?.role;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
}

// Middleware para verificar rol userClient
function requireUserClient(req, res, next) {
  if (req.user.role !== "userClient") {
    return res.status(403).json({ error: "Acceso denegado" });
  }
  next();
}

// Conexión a MongoDB
async function getDb() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  return client.db("forangend");
}

// Lectura de colecciones permitidas
app.get(
  "/solicitud_citas",
  authMiddleware,
  requireUserClient,
  async (req, res) => {
    const db = await getDb();
    const data = await db.collection("solicitud_citas").find().toArray();
    res.json(data);
  }
);

app.get("/doctores", authMiddleware, requireUserClient, async (req, res) => {
  const db = await getDb();
  const data = await db.collection("doctores").find().toArray();
  res.json(data);
});

app.get("/fin_citas", authMiddleware, requireUserClient, async (req, res) => {
  const db = await getDb();
  const data = await db.collection("fin_citas").find().toArray();
  res.json(data);
});

// Escritura en fin_citas y solicitud_citas
app.post("/fin_citas", authMiddleware, requireUserClient, async (req, res) => {
  const db = await getDb();
  const result = await db.collection("fin_citas").insertOne(req.body);
  res.json({ insertedId: result.insertedId });
});

app.post(
  "/solicitud_citas",
  authMiddleware,
  requireUserClient,
  async (req, res) => {
    const db = await getDb();
    const result = await db.collection("solicitud_citas").insertOne(req.body);
    res.json({ insertedId: result.insertedId });
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
