import { Router } from "express";
import estimuloFiscalController from "../controllers/estimuloFiscalController.js";

const router = Router();

// Obtener todos los estímulos fiscales
router.get("/", estimuloFiscalController.obtenerTodos);

// Buscar estímulos fiscales por texto. Ejemplo: GET /api/estimulos/buscar?texto=Descuento
router.get("/buscar", estimuloFiscalController.buscar);

export default router;