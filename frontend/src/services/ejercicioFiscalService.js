import api from "../api/axios.js";

// Obtener todos los ejercicios fiscales
export const getEjerciciosFiscalesAPI = async () => {
    const response = await api.get("/ejercicios-fiscales");
    return response.data;
};

// Crear un ejercicio fiscal
export const createEjercicioFiscalAPI = async (data) => {
    const response = await api.post("/ejercicios-fiscales", data);
    return response.data;
};