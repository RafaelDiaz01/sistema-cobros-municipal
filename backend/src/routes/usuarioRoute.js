import express from "express";
import { obtenerUsuarios, crearUsuario, login } from "../controllers/usuarioController.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Crear un nuevo usuario
router.post("/", crearUsuario);

// Ruta para el login de usuarios
router.post("/login", login);


export default router;