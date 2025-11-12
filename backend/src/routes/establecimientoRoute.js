import express from "express";
import {
  crearEstablecimiento,
  obtenerEstablecimientos,
} from "../controllers/establecimientoController.js";

const router = express.Router();

// Obtener todos los establecimientos
router.get("/", obtenerEstablecimientos);

// Crear un nuevo establecimiento
router.post("/", crearEstablecimiento);

export default router;
