import { Router } from "express";
import PagoController from "../controllers/pagoController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

/*
  POST /api/pagos
*/
router.post("/", authMiddleware, PagoController.registrar);

/*
  GET /api/pagos
*/
router.get("/", authMiddleware, PagoController.listar);

/*
  GET /api/pagos/:id
*/
router.get("/:id", authMiddleware, PagoController.obtenerPorId);

export default router;
