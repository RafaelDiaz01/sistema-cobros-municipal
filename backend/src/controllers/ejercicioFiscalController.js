import * as ejercicioFiscalService from '../services/ejercicioFiscalService.js';

// Obtener todos los ejercicios fiscales
export const getEjerciciosFiscales = async (req, res) => {
  try {
    const ejerciciosFiscales = await ejercicioFiscalService.obtenerEjerciciosFiscales();
    res.json(ejerciciosFiscales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo ejercicio fiscal
export const postEjercicioFiscal = async (req, res) => {
  try {
    const ejercicioFiscal = await ejercicioFiscalService.crearEjercicioFiscal(req.body);
    res.status(201).json(ejercicioFiscal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};