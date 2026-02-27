import express from "express";
import * as reciboController from "../controllers/reciboController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Crear recibo a partir de un pago
router.post("/:id_pago", authMiddleware, reciboController.crearReciboDesdePago);

// Obtener historial de recibos
router.get("/", authMiddleware, reciboController.obtenerHistorialRecibos);

// Cancelar recibo
router.patch("/:id_recibo/cancelar", authMiddleware, reciboController.cancelarRecibo);

export default router;