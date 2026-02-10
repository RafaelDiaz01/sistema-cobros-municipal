import express from "express";
import * as seccionController from "../controllers/seccionController.js";
const router = express.Router();

// Obtener todas las secciones
router.get("/", seccionController.getAllSecciones);

export default router;
