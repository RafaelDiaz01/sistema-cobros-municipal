import express from "express";
import * as contribuyenteController from "../controllers/contribuyenteController.js";

const router = express.Router();

// Obtener todos los contribuyentes
router.get("/", contribuyenteController.getContribuyentes);

// Crear un nuevo contribuyente
router.post("/", contribuyenteController.postContribuyente);

// Actualizar el estado de un contribuyente
router.put("/:id/estado", contribuyenteController.putContribuyenteEstado);

// Actualizar datos de un contribuyente
router.put("/:id" , contribuyenteController.putContribuyente);

export default router;
