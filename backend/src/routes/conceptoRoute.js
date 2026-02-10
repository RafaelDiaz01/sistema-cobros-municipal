import express from "express";
import * as conceptoController from "../controllers/conceptoController.js";

const router = express.Router();

// Obtener todos los conceptos de pago
router.get("/", conceptoController.getAllConceptos);

export default router;