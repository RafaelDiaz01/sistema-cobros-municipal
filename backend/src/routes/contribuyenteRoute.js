import express from "express";
import * as contribuyenteController from "../controllers/contribuyenteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener todos los contribuyentes
router.get("/", authMiddleware, contribuyenteController.getContribuyentes);

// Crear un nuevo contribuyente
router.post("/", authMiddleware, contribuyenteController.postContribuyente);

// Actualizar el estado de un contribuyente
router.put("/:id/estado", authMiddleware, contribuyenteController.putContribuyenteEstado);

// Actualizar datos de un contribuyente
router.put("/:id", authMiddleware, contribuyenteController.putContribuyente);

export default router;
