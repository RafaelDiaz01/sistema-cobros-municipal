import Subcuenta from "../models/Subcuenta.js";

// Obtener todas las subcuentas contables
export const getAllSubcuentas = async () => {
  try {
    const subcuentas = await Subcuenta.findAll();
    return subcuentas;
  } catch (error) {
    console.error("Error al obtener las subcuentas:", error);
    throw error;
  }
};