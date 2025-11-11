import express from "express";
import contribuyenteRoutes from "./routes/contribuyenteRoutes.js";
import usuariosRoutes from "./routes/usuarioRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/contribuyentes", contribuyenteRoutes);
app.use("/api/usuarios", usuariosRoutes)

export default app;
