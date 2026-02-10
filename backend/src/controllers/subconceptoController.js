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

// Crear un nuevo subconcepto
export const createSubconcepto = async (req, res) => {
  try {
    const subconcepto = await subconceptoService.createSubconcepto(req.body);
    res.status(201).json(subconcepto);
  } catch (error) {
    console.error("Error al crear el subconcepto:", error);
    res.status(500).json({ error: "Error al crear el subconcepto" });
  }
};

// Actualizar un subconcepto existente
export const updateSubconcepto = async (req, res) => {
  try {
    const subconcepto = await subconceptoService.updateSubconcepto(
      req.params.id,
      req.body,
    );
    res.json(subconcepto);
  } catch (error) {
    console.error("Error al actualizar el subconcepto:", error);
    res.status(500).json({ error: "Error al actualizar el subconcepto" });
  }
};