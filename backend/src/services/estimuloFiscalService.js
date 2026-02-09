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

  // Actualizar el estado del estímulo fiscal
  static async actualizarEstado(id, activo) {
    const estimulo = await EstimuloFiscal.findByPk(id);

    if (!estimulo) {
      return null;
    }

    estimulo.activo = activo;
    await estimulo.save();

    return estimulo;
  }
}

export default estimuloFiscalService;
