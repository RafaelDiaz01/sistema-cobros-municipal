import express from 'express';
import * as ejercicioFiscalController from '../controllers/ejercicioFiscalController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obtener todos los ejercicios fiscales
router.get('/', authMiddleware, ejercicioFiscalController.getEjerciciosFiscales);

// Crear un nuevo ejercicio fiscal
router.post('/', authMiddleware, ejercicioFiscalController.postEjercicioFiscal);

export default router;