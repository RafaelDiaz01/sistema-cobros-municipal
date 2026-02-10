import api from "../api/axios.js";

// Obtener todas los subconceptos
export const getSubconceptosAPI = async () => {
  const response = await api.get("/subconceptos");
  return response.data;
};

// Crear un subconcepto
export const createSubconceptoAPI = async (data) => {
  const response = await api.post("/subconceptos", data);
  return response.data;
};

// Actualizar un subconcepto
export const updateSubconceptoAPI = async (id, data) => {
  const response = await api.put(`/subconceptos/${id}`, data);
  return response.data;
};