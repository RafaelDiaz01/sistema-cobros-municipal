import { Router } from "express";
import conceptoPagoController from "../controllers/conceptoPagoController.js";

const router = Router();

// Buscar conceptos de pago por texto. Ejemplo: GET /api/conceptos/buscar?texto=Impuestos
router.get("/buscar", conceptoPagoController.buscar);

export default router;
