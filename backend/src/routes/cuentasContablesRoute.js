import express from "express";
import * as cuentasController from "../controllers/cuentasContablesController.js";

const router = express.Router();

// Obtener todas las cuentas contables
router.get("/", cuentasController.getAllCuentas);

export default router;
