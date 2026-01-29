import { Router } from "express";
import PagoController from "../controllers/pagoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Crear un nuevo pago
router.post("/", authMiddleware, PagoController.registrar);

// Obtener todos los pagos
router.get("/", authMiddleware, PagoController.listar);

// Obtener un pago por ID
router.get("/:id", authMiddleware, PagoController.obtenerPorId);

// Obtener pagos por corte de caja
router.get("/corte/:id_corte", authMiddleware, PagoController.obtenerPagosPorCorte);

export default router;
