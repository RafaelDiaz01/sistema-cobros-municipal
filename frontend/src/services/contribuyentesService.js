import api from "../api/axios.js";

// Obtener todos los contribuyentes
export const getContribuyentes = async ({
  page,
  limit,
}) => {
  const response = await api.get(
    "/contribuyentes",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};

// Obtener estadísticas de contribuyentes. Eliminar, ya no sirve
export const getEstadisticasContribuyentes = async () => {
  const response = await api.get("/contribuyentes/estadisticas");
  return response.data;
};

// Crear un nuevo contribuyente
export const createContribuyente = async (data) => {
  const response = await api.post("/contribuyentes", data);
  return response.data;
};

// Actualizar un contribuyente existente
export const updateStatusContribuyente = async (id, data) => {
  const response = await api.put(`/contribuyentes/${id}/estado`, data);
  return response.data;
};

// Actualizar datos de un contribuyente
export const updateContribuyente = async (id, data) => {
  const response = await api.put(`/contribuyentes/${id}`, data);
  return response.data;
};

// Buscar contribuyentes por nombre
export const searchContribuyentes = async (nombre) => {
  const response = await api.get(`/contribuyentes/buscar`, {
    params: { nombre },
  });
  return response.data;
};
