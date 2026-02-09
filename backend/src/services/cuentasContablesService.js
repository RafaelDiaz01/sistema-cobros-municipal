import Cuenta from "../models/CuentaContable.js";

// Obtener todas las cuentas contables
export const getAllCuentas = async () => {
  try {
    const cuentas = await Cuenta.findAll();
    return cuentas;
  } catch (error) {
    console.error("Error al obtener las cuentas:", error);
    throw error;
  }
};
