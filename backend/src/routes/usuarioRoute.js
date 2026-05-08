import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";
const router = express.Router();

// Obtener todos los usuarios
router.get("/", usuarioController.obtenerUsuarios);

// Crear un nuevo usuario
router.post("/", usuarioController.crearUsuario);

// Actualizar datos de un usuario existente
router.put("/:id", usuarioController.actualizarUsuario);

// Actualizar estado de un usuario
router.patch("/:id/estado", usuarioController.actualizarUsuarioEstado);

export default router;