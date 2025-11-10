import express from "express";
import contribuyenteRoutes from "./routes/contribuyenteRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/contribuyentes", contribuyenteRoutes);

export default app;
