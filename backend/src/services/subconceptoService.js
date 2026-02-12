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

// Crear un nuevo subconcepto
export const createSubconcepto = async (data) => {
  try {
    const subconcepto = await Subconcepto.create(data);
    return subconcepto;
  } catch (error) {
    console.error("Error al crear el subconcepto:", error);
    throw error;
  }
};

// Actualizar un subconcepto existente
export const updateSubconcepto = async (id, data) => {
  try {
    const subconcepto = await Subconcepto.findByPk(id);
    if (!subconcepto) throw new Error("Subconcepto no encontrado");
    await subconcepto.update(data);
    return subconcepto;
  } catch (error) {
    console.error("Error al actualizar el subconcepto:", error);
    throw error;
  }
};

// Actualizar estado de un subconcepto
export const updateSubconceptoEstado = async (id, estado) => {
  try {
    const subconcepto = await Subconcepto.findByPk(id);
    if (!subconcepto) throw new Error("Subconcepto no encontrado");
    subconcepto.activo = estado;
    await subconcepto.save();
    return subconcepto;
  } catch (error) {
    console.error("Error al actualizar el estado del subconcepto:", error);
    throw error;
  }
};
