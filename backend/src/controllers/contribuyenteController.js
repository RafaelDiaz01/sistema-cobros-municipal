import * as contribuyenteService from "../services/contribuyenteService.js";

// Obtener todos los contribuyentes
export const getContribuyentes = async (req, res) => {
  try {
    const contribuyentes = await contribuyenteService.obtenerContribuyentes();
    res.json(contribuyentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo contribuyente
export const postContribuyente = async (req, res) => {
  try {
    const contribuyente = await contribuyenteService.crearContribuyente(req.body);
    res.status(201).json(contribuyente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar el estado de un contribuyente
export const putContribuyenteEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const contribuyenteActualizado = await contribuyenteService.actualizarEstadoContribuyente(id, estado);
    res.json({
      message: "Estado del contribuyente actualizado correctamente",
      contribuyente: contribuyenteActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar estado del contribuyente", error: error.message, });
  }
};

// Actualizar los datos de un contribuyente
export const putContribuyente = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const contribuyenteActualizado = await contribuyenteService.actualizarContribuyente(id, data);
    res.json({
      message: "Contribuyente actualizado correctamente",
      contribuyente: contribuyenteActualizado
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al actualizar los datos del contribuyente",
      error: error.message
    });
  }
}
