import * as subconceptoService from "../services/subconceptoService.js";

// Obtener todos los subconceptos
export const getAllSubconceptos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const subconceptos = await subconceptoService.getAllSubconceptos(page, limit);
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

// Actualizar estado de un subconcepto
export const updateSubconceptoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const subconcepto = await subconceptoService.updateSubconceptoEstado(id, estado);
    res.json(subconcepto);
  } catch (error) {
    console.error("Error al actualizar el estado del subconcepto:", error);
    res.status(500).json({ error: "Error al actualizar el estado del subconcepto" });
  }
};

// Obtener estadísticas de subconceptos
export const getSubconceptoStats = async (req, res) => {
  try {
    const estadisticas = await subconceptoService.getSubconceptoStats();
    res.json(estadisticas);
  } catch (error) {
    console.error("Error al obtener las estadísticas de subconceptos:", error);
    res.status(500).json({ message: "Error al obtener las estadísticas de subconceptos" });
  }
};
