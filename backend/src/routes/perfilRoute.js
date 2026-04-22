import express from "express";
import * as perfilController from "../controllers/perfilController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener perfil
router.get("/", authMiddleware, perfilController.getPerfil);

// Actualizar datos del perfil
router.put("/", authMiddleware, perfilController.putPerfil);

export default router;