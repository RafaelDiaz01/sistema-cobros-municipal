import express from "express";
import contribuyenteRoutes from "./routes/contribuyenteRoute.js";
import usuariosRoutes from "./routes/usuarioRoute.js";
import establecimientoRoutes from "./routes/establecimientoRoute.js";
import baseCatastralRoutes from "./routes/baseCatastralRoute.js";

// Cargar modelos y asociaciones para que estén disponibles al arrancar
import "./models/associations.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/contribuyentes", contribuyenteRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/establecimientos", establecimientoRoutes);
app.use("/api/bases-catastrales", baseCatastralRoutes);

export default app;
