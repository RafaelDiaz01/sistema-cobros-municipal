import * as seccionService from "../services/seccionService.js";

// Obtener todas las secciones
export const getAllSecciones = async (req, res) => {
  try {
    const secciones = await seccionService.getAllSecciones();
    res.json(secciones);
  } catch (error) {
    console.error("Error al obtener las secciones:", error);
    res.status(500).json({ error: "Error al obtener las secciones" });
  }
};