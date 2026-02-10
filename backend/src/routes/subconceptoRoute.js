import Express from "express";
import * as subconceptoController from "../controllers/subconceptoController.js";

const router = Express.Router();

// Obtener todos los subconceptos
router.get("/", subconceptoController.getAllSubconceptos);

// Crear un nuevo subconcepto
router.post("/", subconceptoController.createSubconcepto);

// Actualizar un subconcepto existente
router.patch("/:id", subconceptoController.updateSubconcepto);

export default router;
