import express from "express";
import * as conexionController from "../controllers/conexionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener todas las conexiones
router.get("/", authMiddleware, conexionController.obtenerConexiones);

// Crear una nueva conexión
router.post("/", authMiddleware, conexionController.crearConexion);

// Actualizar el estado de una conexión
router.patch("/:id/estado", authMiddleware, conexionController.putConexionEstado);

// Actualizar datos de una conexión
router.patch("/:id", authMiddleware, conexionController.putConexion);

// Obtener el estado de adeudo de una conexión
router.get("/:id/adeudo", authMiddleware, conexionController.getConexionEstado);

export default router;