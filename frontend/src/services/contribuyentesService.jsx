import { createContribuyenteAPI } from "../api/contribuyentes.js";
import { updateStatusContribuyenteAPI } from "../api/contribuyentes.js";

// Crear contribuyente
export const createContribuyente = async (formData) => {
  // Llamar a la API para crear el contribuyente
  return await createContribuyenteAPI(formData);
}

// Actualizar estado de contribuyente
export const updateStatusContribuyente = async (id, estado) => {
  return await updateStatusContribuyenteAPI(id, { estado });
}
