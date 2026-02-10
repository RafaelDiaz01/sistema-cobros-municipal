import Express from "express";
import * as subconceptoController from "../controllers/subconceptoController.js";

const router = Express.Router();

// Obtener todos los subconceptos
router.get("/", subconceptoController.getAllSubconceptos);

export default router;
