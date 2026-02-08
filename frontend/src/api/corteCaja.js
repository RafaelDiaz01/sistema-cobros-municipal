import api from "./axios.js";

// Obtener datos de el corte activo de un usuario
export const getCorteActivoAPI = async () => {
  const response = await api.get(`/corte-caja/activo`);
  return response.data;
};

// Obtener pagos por corte de caja
export const getPagosPorCorteAPI = async (id_corte) => {
  const response = await api.get(`/pagos/corte/${id_corte}`);
  return response.data;
};

// Cerrar corte de caja
export const cerrarCorteCajaAPI = async (
  id_corte_caja,
  id_usuario,
  saldo_real,
  observaciones,
) => {
  const response = await api.put(`/corte-caja/cerrar/${id_corte_caja}`, {
    id_usuario,
    saldo_real,
    observaciones,
  });
  return response.data;
};

// Iniciar nuevo corte de caja
export const iniciarCorteCajaAPI = async (monto_inicial) => {
  const response = await api.post(`/corte-caja/abrir`, {
    monto_inicial,
  });
  return response.data;
};
