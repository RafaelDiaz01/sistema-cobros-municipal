import { Router } from "express";
import { uploadLogo, uploadQR } from "../middlewares/uploadMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import ConfiguracionController from "../controllers/configuracionController.js";

const router = Router();

// Obtener configuración actual
router.get("/", authMiddleware, ConfiguracionController.obtener);

// Actualizar configuración general
router.put("/", authMiddleware, ConfiguracionController.actualizar);

// Actualizar logo
router.put(
  "/logo",
  authMiddleware,
  uploadLogo.single("logo"),
  ConfiguracionController.actualizarLogo,
);

// Actualizar código QR
router.put(
  "/qr",
  authMiddleware,
  uploadQR.single("qr"),
  ConfiguracionController.actualizarQR,
);

export default router;
