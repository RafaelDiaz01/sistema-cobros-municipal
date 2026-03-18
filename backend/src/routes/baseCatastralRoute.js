import express from "express";
import * as baseCatastralController from "../controllers/baseCatastralController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener todas las bases catastrales
router.get("/", authMiddleware, baseCatastralController.obtenerBasesCatastrales);

// Crear una nueva base catastral
router.post("/", authMiddleware, baseCatastralController.crearBaseCatastral);

// Actualizar el estado de una base catastral
router.put("/:id/estado", authMiddleware, baseCatastralController.putBaseCatastralEstado);

// Actualizar datos de una base catastral
router.put("/:id", authMiddleware, baseCatastralController.putBaseCatastral);

export default router;