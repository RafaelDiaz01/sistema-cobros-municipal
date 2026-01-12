import express from "express";
import cors from "cors";
import contribuyenteRoutes from "./routes/contribuyenteRoute.js";
import usuariosRoutes from "./routes/usuarioRoute.js";
import establecimientoRoutes from "./routes/establecimientoRoute.js";
import baseCatastralRoutes from "./routes/baseCatastralRoute.js";

// Cargar modelos y asociaciones para que estén disponibles al arrancar
import "./models/associations.js";

const app = express();

// Habilitar CORS
app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Sirve para parsear formularios

// Rutas
app.use("/api/contribuyentes", contribuyenteRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/establecimientos", establecimientoRoutes);
app.use("/api/bases-catastrales", baseCatastralRoutes);

export default app;
