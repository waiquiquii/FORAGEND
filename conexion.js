// require("dotenv").config();
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";
import "dotenv/config";

// Inicializa Firebase Admin SDK
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

async function run(userToken) {
  try {
    if (!userToken) {
      throw new Error("Token de usuario no proporcionado");
    }
    // Verifica el token de Firebase
    const decodedToken = await admin.auth().verifyIdToken(userToken);
    const userRole = decodedToken.role || decodedToken.customClaims?.role;

    if (userRole !== "admin") {
      throw new Error("No tienes permisos para esta operación");
    }

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("¡Conexión exitosa a MongoDB!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

// Obtén el token desde variable de entorno, argumento o archivo
let userToken = process.env.USER_TOKEN || process.argv[2];
if (!userToken && fs.existsSync("user_token.txt")) {
  userToken = fs.readFileSync("user_token.txt", "utf8").trim();
}

run(userToken).catch(console.dir);
