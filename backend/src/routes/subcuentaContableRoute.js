import express from "express";
import * as subcuentaController from "../controllers/subcuentaContableController.js";

const router = express.Router();

// Obtener todas las subcuentas contables
router.get("/", subcuentaController.getAllSubcuentas);

export default router;