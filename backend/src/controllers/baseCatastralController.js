import { BaseCatastral, Contribuyente } from "../models/associations.js";

// Obtener todas las Bases Catastrales
export const obtenerBasesCatastrales = async (req, res) => {
  try {
    const bases = await BaseCatastral.findAll({
      include: {
        model: Contribuyente,
        as: "contribuyente",
        attributes: ["id_contribuyente", "nombre"],
      },
    });

    res.json(bases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener las bases catastrales" });
  }
};

// Crear una nueva base catastral
export const crearBaseCatastral = async (req, res) => {
  try {
    const {
      cuenta,
      valor,
      calle,
      numero_calle,
      barrio,
      impuesto_calculado,
      fecha_avaluo,
      id_contribuyente,
    } = req.body;

    // Validar que el contribuyente exista
    const contribuyente = await Contribuyente.findByPk(id_contribuyente);
    if (!contribuyente) {
      return res.status(404).json({ mensaje: "Contribuyente no encontrado" });
    }

    // Crear base catastral
    const nuevaBaseCatastral = await BaseCatastral.create({
      cuenta,
      valor,
      calle,
      numero_calle,
      barrio,
      impuesto_calculado,
      fecha_avaluo,
      id_contribuyente
    });

    res.status(201).json(nuevaBaseCatastral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear la base catastral"});
  }
};
