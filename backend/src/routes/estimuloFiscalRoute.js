import { Router } from "express";
import estimuloFiscalController from "../controllers/estimuloFiscalController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Obtener todos los estímulos fiscales
router.get("/", authMiddleware, estimuloFiscalController.obtenerTodos);

// Actualizar el estado del estímulo fiscal
router.patch("/:id/estado", authMiddleware, estimuloFiscalController.actualizarEstado);

// Buscar estímulos fiscales por texto. Ejemplo: GET /api/estimulos/buscar?texto=Descuento
router.get("/buscar", authMiddleware, estimuloFiscalController.buscar);


export default router;