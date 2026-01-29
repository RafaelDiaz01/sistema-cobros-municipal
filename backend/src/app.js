import express from "express";
import cors from "cors";
import contribuyenteRoutes from "./routes/contribuyenteRoute.js";
import usuariosRoutes from "./routes/usuarioRoute.js";
import establecimientoRoutes from "./routes/establecimientoRoute.js";
import baseCatastralRoutes from "./routes/baseCatastralRoute.js";
import pagoRoutes from "./routes/pagoRoute.js";
import conceptoPagoRoute from "./routes/conceptoPagoRoute.js";
import estimuloFiscalRoute from "./routes/estimuloFiscalRoute.js";
import corteCajaRoute from "./routes/corteCajaRoute.js";
import dotenv from "dotenv";

dotenv.config();

// Cargar modelos y asociaciones para que estén disponibles al arrancar
import "./models/associations.js";

const app = express();

// Habilitar CORS
app.use(cors({
  origin: process.env.URL_FRONTEND || "http://localhost:5173",
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
app.use("/api/pagos", pagoRoutes);
app.use("/api/corte-caja", corteCajaRoute);
app.use("/api/conceptos", conceptoPagoRoute);
app.use("/api/estimulos", estimuloFiscalRoute);

export default app;
