import api from "../api/axios.js";

// Obtener todas las bases catastrales
export const getBasesCatastralesAPI = async () => {
    const response = await api.get("/bases-catastrales");
    return response.data;
};

// Crear una base catastral
export const createBaseCatastralAPI = async (data) => {
    const response = await api.post("/bases-catastrales", data);
    return response.data;
};

// Actualizar una base catastral
export const updateBaseCatastralAPI = async (id, data) => {
    const response = await api.patch(`/bases-catastrales/${id}`, data);
    return response.data;
};

// Actualizar estado de una base catastral
export const updateBaseCatastralEstadoAPI = async (id, estado) => {
    const response = await api.patch(`/bases-catastrales/${id}/estado`, estado);
    return response.data;
};