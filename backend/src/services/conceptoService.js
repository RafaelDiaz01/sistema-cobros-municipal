import Concepto from "../models/Concepto.js";

// Obtener todos los conceptos de pago
export const getAllConceptos = async () => {
  try {
    const conceptos = await Concepto.findAll();
    return conceptos;
  } catch (error) {
    console.error("Error al obtener los conceptos:", error);
    throw error;
  }
};