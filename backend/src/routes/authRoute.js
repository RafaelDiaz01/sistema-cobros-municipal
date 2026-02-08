import { Router } from "express";
import { login, refreshAccessToken, logout } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
