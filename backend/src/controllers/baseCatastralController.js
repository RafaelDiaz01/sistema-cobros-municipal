import * as baseCatastral from "../services/baseCatastralService.js";

// Obtener todas las bases catastrales (con su contribuyente)
export const obtenerBasesCatastrales = async (req, res) => {
  try {
    const basesCatastrales = await baseCatastral.obtenerBasesCatastrales();
    res.json(basesCatastrales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener bases catastrales" });
  }
};

// Crear una nueva base catastral
export const crearBaseCatastral = async (req, res) => {
  try {
    const nuevaBaseCatastral = await baseCatastral.crearBaseCatastral(req.body);
    res.status(201).json(nuevaBaseCatastral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la base catastral" });
  }
};

// Actualizar el estado de una base catastral
export const putBaseCatastralEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const baseCatastralActualizada =
      await baseCatastral.actualizarEstadoBaseCatastral(id, estado);

    res.json({
      message: "Estado de la base catastral actualizado correctamente",
      baseCatastral: baseCatastralActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar estado de la base catastral",
      error: error.message,
    });
  }
};

// Actualizar datos de una base catastral
export const putBaseCatastral = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const baseCatastralActualizada =
      await baseCatastral.actualizarBaseCatastral(id, datosActualizados);

    res.json({
      message: "Base catastral actualizada correctamente",
      baseCatastral: baseCatastralActualizada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar la base catastral",
      error: error.message,
    });
  }
};