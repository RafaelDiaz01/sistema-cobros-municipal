import Seccion from "../models/Seccion.js";

// Obtener todas las secciones
export const getAllSecciones = async () => {
  try {
    const secciones = await Seccion.findAll();
    return secciones;
  } catch (error) {
    console.error("Error al obtener las secciones:", error);
    throw error;
  }
};