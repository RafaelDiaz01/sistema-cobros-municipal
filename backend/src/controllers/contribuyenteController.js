import Contribuyente from "../models/ContribuyenteModel.js";

export const obtenerContribuyentes = async (req, res) => {
  try {
    const contribuyentes = await Contribuyente.findAll();
    res.json(contribuyentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearContribuyente = async (req, res) => {
  try {
    const nuevo = await Contribuyente.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
