import { updateEstablecimientoAPI } from "../api/establecimientos.js";
import { createEstablecimientoAPI } from "../api/establecimientos.js";

// Crear establecimiento
export const createEstablecimiento = async (formData) => {
    return await createEstablecimientoAPI(formData);
}

// Actualizar datos de un establecimiento
export const updateEstablecimiento = async (id, data) => {
  try {
    const response = await updateEstablecimientoAPI(id, data);
    return response;
  } catch (error) {
    console.error("Error al actualizar establecimiento", error);
    throw error;
  }
};
