import * as cuentasService from "../services/cuentaContableService.js";

// Obtener todas las cuentas contables
export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await cuentasService.getAllCuentas();
    res.json(cuentas);
  } catch (error) {
    console.error("Error al obtener las cuentas:", error);
    res.status(500).json({ error: "Error al obtener las cuentas" });
  }
};
