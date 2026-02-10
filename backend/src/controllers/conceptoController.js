import * as conceptoService from "../services/conceptoService.js";

// Obtener todos los conceptos de pago
export const getAllConceptos = async (req, res) => {
  try {
    const conceptos = await conceptoService.getAllConceptos();
    res.json(conceptos);
  } catch (error) {
    console.error("Error al obtener los conceptos:", error);
    res.status(500).json({ error: "Error al obtener los conceptos" });
  }
};
