import express from "express";
import {
    crearBaseCatastral,
    obtenerBasesCatastrales
} from "../controllers/baseCatastralController.js";

const router = express.Router();

// Obtener todas las bases catastrales
router.get("/", obtenerBasesCatastrales);

// Crear una nueva base catastral 
router.post("/", crearBaseCatastral);
export default router;