import express from "express";
import * as establecimientoController from "../controllers/establecimientoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener todos los establecimientos
router.get("/", authMiddleware, establecimientoController.obtenerEstablecimientos);

// Crear un nuevo establecimiento
router.post("/", authMiddleware, establecimientoController.crearEstablecimiento);

// Actualizar el estado de un establecimiento
router.put("/:id/estado", authMiddleware, establecimientoController.putEstablecimientoEstado);

// Actualizar datos de un establecimiento
router.put("/:id", authMiddleware, establecimientoController.putEstablecimiento);

export default router;
