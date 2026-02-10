import * as subconceptoService from "../services/subconceptoService.js";

// Obtener todos los subconceptos
export const getAllSubconceptos = async (req, res) => {
  try {
    const subconceptos = await subconceptoService.getAllSubconceptos();
    res.json(subconceptos);
  } catch (error) {
    console.error("Error al obtener los subconceptos:", error);
    res.status(500).json({ error: "Error al obtener los subconceptos" });
  }
};