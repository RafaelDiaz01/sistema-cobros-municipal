import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login", authController.login);
router.post("/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.obtenerSesion);

export default router;
