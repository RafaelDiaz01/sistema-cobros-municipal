import express from "express";
import { obtenerContribuyentes, crearContribuyente } from "../controllers/contribuyenteController.js";

const router = express.Router();

// Obtener todos los contribuyentes
router.get("/", obtenerContribuyentes);

// Crear un nuevo contribuyente
router.post("/", crearContribuyente);

export default router;
