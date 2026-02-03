import { Router } from "express";
import CorteCajaController from "../controllers/corteCajaController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// Crear un nuevo corte de caja
router.post("/abrir", authMiddleware, CorteCajaController.abrir);

// Cerrar un corte de caja existente
router.put("/cerrar/:id", authMiddleware, CorteCajaController.cerrar);

// Listar cortes de caja por usuario
router.get(
  "/usuario/:id_usuario",
  authMiddleware,
  CorteCajaController.listarPorUsuario,
);

// Obtener datos del corte activo de un usuario
router.get(
  "/activo/:id_usuario",
  authMiddleware,
  CorteCajaController.obtenerCorteActivo,
);

export default router;
