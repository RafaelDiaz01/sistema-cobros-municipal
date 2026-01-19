import * as establecimientoService from "../services/establecimientoService.js";

// Obtener todos los establecimientos (con su contribuyente)
export const obtenerEstablecimientos = async (req, res) => {
  try {
    const establecimientos =
      await establecimientoService.obtenerEstablecimientos();
    res.json(establecimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener establecimientos" });
  }
};

// Crear un nuevo establecimiento
export const crearEstablecimiento = async (req, res) => {
  try {
    const establecimiento = await establecimientoService.crearEstablecimiento(req.body);
    res.status(201).json(establecimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el establecimiento" });
  }
};

// Actualizar el estado de un establecimiento
export const putEstablecimientoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const establecimientoActualizado =
      await establecimientoService.actualizarEstadoEstablecimiento(id, estado);

    res.json({
      message: "Estado del establecimiento actualizado correctamente",
      establecimiento: establecimientoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar estado del establecimiento",
      error: error.message,
    });
  }
};

// Actualizar datos de un establecimiento
export const putEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const establecimientoActualizado =
      await establecimientoService.actualizarEstablecimiento(id, datosActualizados);

    res.json({
      message: "Establecimiento actualizado correctamente",
      establecimiento: establecimientoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar el establecimiento",
      error: error.message,
    });
  }
};
