import * as subcuentaService from "../services/subcuentaContableService.js";

// Obtener todas las subcuentas contables
export const getAllSubcuentas = async (req, res) => {
  try {
    const subcuentas = await subcuentaService.getAllSubcuentas();
    res.json(subcuentas);
  } catch (error) {
    console.error("Error al obtener las subcuentas:", error);
    res.status(500).json({ error: "Error al obtener las subcuentas" });
  }
};
