import express from "express";
import * as perfilController from "../controllers/perfilController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadFotoPerfil } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Obtener perfil
router.get("/", authMiddleware, perfilController.getPerfil);

// Actualizar datos del perfil
router.put("/", authMiddleware, perfilController.putPerfil);

// Subir foto de perfil
router.put(
    "/subir-foto",
    authMiddleware,
    uploadFotoPerfil.single("foto_perfil"),
    perfilController.uploadFotoPerfil
);

// Cambiar contraseña
router.put("/cambiar-password", authMiddleware, perfilController.putPassword);

export default router;