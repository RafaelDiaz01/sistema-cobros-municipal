import EstimuloFiscal from "../models/EstimuloFiscal.js";
import { Op } from "sequelize";

// Buscar estímulos fiscales por nombre o descripción
export const buscarEstimulosFiscales = async (texto) => {
  return await EstimuloFiscal.findAll({
    where: {
      [Op.or]: [
        {
          nombre: {
            [Op.like]: `%${texto}%`,
          },
        },
        {
          descripcion: {
            [Op.like]: `%${texto}%`,
          },
        },
      ],
    },
    limit: 10,
  });
};

// Obtener todos los estímulos fiscales
export const obtenerTodosEstimulosFiscales = async () => {
  return await EstimuloFiscal.findAll();
};