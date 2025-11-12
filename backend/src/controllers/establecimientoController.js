import { Establecimiento, Contribuyente } from "../models/associations.js";

// Obtener todos los establecimientos (con su contribuyente)
export const obtenerEstablecimientos = async (req, res) => {
  try {
    const establecimientos = await Establecimiento.findAll({
      include: {
        model: Contribuyente,
        as: "contribuyente",
        attributes: ["id_contribuyente", "nombre", "apellido_paterno"],
      },
    });

    res.json(establecimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los establecimientos" });
  }
};

// Crear un nuevo establecimiento
export const crearEstablecimiento = async (req, res) => {
  try {
    const {
      nombre,
      calle,
      numero_calle,
      barrio,
      fecha_apertura,
      giro,
      id_contribuyente,
    } = req.body;

    // Validar que el contribuyente exista
    const contribuyente = await Contribuyente.findByPk(id_contribuyente);
    if (!contribuyente) {
      return res.status(404).json({ mensaje: "Contribuyente no encontrado" });
    }

    // Crear establecimiento
    const nuevoEstablecimiento = await Establecimiento.create({
      nombre,
      calle,
      numero_calle,
      barrio,
      fecha_apertura,
      giro,
      id_contribuyente,
    });

    res.status(201).json(nuevoEstablecimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el establecimiento" });
  }
};

