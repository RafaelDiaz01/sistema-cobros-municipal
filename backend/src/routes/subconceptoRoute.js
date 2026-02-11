import Express from "express";
import * as subconceptoController from "../controllers/subconceptoController.js";

const router = Express.Router();

// Obtener todos los subconceptos
router.get("/", subconceptoController.getAllSubconceptos);

// Crear un nuevo subconcepto
router.post("/", subconceptoController.createSubconcepto);

// Actualizar un subconcepto existente
router.patch("/:id", subconceptoController.updateSubconcepto);

// Actualizar estado de un subconcepto
router.patch("/:id/estado", subconceptoController.updateSubconceptoEstado);

export default router;
