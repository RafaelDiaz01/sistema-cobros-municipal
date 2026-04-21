import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import contribuyenteRoutes from "./routes/contribuyenteRoute.js";
import usuariosRoutes from "./routes/usuarioRoute.js";
import establecimientoRoutes from "./routes/establecimientoRoute.js";
import conexionRoutes from "./routes/conexionRoute.js";
import baseCatastralRoutes from "./routes/baseCatastralRoute.js";
import pagoRoutes from "./routes/pagoRoute.js";
import conceptoPagoRoute from "./routes/conceptoPagoRoute.js";
import estimuloFiscalRoute from "./routes/estimuloFiscalRoute.js";
import corteCajaRoute from "./routes/corteCajaRoute.js";
import cuentaContableRoute from "./routes/cuentaContableRoute.js";
import subcuentaContableRoute from "./routes/subcuentaContableRoute.js";
import seccionRoute from "./routes/seccionRoute.js";
import conceptoRoute from "./routes/conceptoRoute.js";
import subconceptoRoute from "./routes/subconceptoRoute.js";
import configuracionRoute from "./routes/configuracionRoute.js";
import reciboRoute from "./routes/reciboRoute.js";
import ejercicioFiscalRoute from "./routes/ejercicioFiscalRoute.js";

dotenv.config();

// Cargar modelos y asociaciones para que estén disponibles al arrancar
import "./models/associations.js";

const app = express();

// Habilitar CORS
app.use(
  cors({
    origin: process.env.URL_FRONTEND || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

// Configurar cookie-parser
app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Sirve para parsear formularios

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/contribuyentes", contribuyenteRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/establecimientos", establecimientoRoutes);
app.use("/api/bases-catastrales", baseCatastralRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/corte-caja", corteCajaRoute);
app.use("/api/conceptos", conceptoPagoRoute);
app.use("/api/estimulos", estimuloFiscalRoute);
app.use("/api/cuentas", cuentaContableRoute);
app.use("/api/subcuentas", subcuentaContableRoute);
app.use("/api/secciones", seccionRoute);
app.use("/api/conceptos", conceptoRoute);
app.use("/api/subconceptos", subconceptoRoute);
app.use("/api/configuracion", configuracionRoute);
app.use("/api/recibos", reciboRoute);
app.use("/api/conexiones", conexionRoutes);
app.use("/api/ejercicios-fiscales", ejercicioFiscalRoute);

export default app;
