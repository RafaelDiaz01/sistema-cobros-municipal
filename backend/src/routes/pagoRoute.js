import { Router } from "express";
import PagoController from "../controllers/pagoController.js";

const router = Router();

/*
  POST /api/pagos
*/
router.post("/", PagoController.registrar);

/*
  GET /api/pagos
*/
router.get("/", PagoController.listar);

/*
  GET /api/pagos/:id
*/
router.get("/:id", PagoController.obtenerPorId);

export default router;
