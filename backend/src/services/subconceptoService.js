import Subconcepto from "../models/Subconcepto.js";

// Obtener todos los subconceptos
export const getAllSubconceptos = async () => {
  try {
    const subconceptos = await Subconcepto.findAll();
    return subconceptos;
  } catch (error) {
    console.error("Error al obtener los subconceptos:", error);
    throw error;
  }
};
