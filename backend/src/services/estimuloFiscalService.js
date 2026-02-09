import EstimuloFiscal from "../models/EstimuloFiscal.js";
import { Op } from "sequelize";
class estimuloFiscalService {
  // Buscar estímulos fiscales por texto
  static async buscarEstimulosFiscales(texto) {
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
  }

  // Obtener todos los estímulos fiscales
  static async obtenerTodos() {
    return await EstimuloFiscal.findAll();
  }
}

export default estimuloFiscalService;
