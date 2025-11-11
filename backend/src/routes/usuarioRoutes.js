import express from "express";
import { obtenerUsuarios, crearUsuario } from "../controllers/usuarioController.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Crear un nuevo usuario
router.get("/", crearUsuario);

export default router;