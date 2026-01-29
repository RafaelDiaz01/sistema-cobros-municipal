import { Router } from "express";
import CorteCajaController from "../controllers/corteCajaController.js";

const router = Router();

// Crear un nuevo corte de caja
router.post("/abrir", CorteCajaController.abrir);

// Cerrar un corte de caja existente
router.put("/cerrar/:id", CorteCajaController.cerrar);

// Listar cortes de caja por usuario
router.get("/usuario/:id_usuario", CorteCajaController.listarPorUsuario);

// Obtener datos del corte activo de un usuario
router.get("/activo/:id_usuario", CorteCajaController.obtenerCorteActivo);

export default router;
