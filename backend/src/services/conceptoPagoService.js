import Cuenta from "../models/CuentaContable.js";
import Subcuenta from "../models/Subcuenta.js";
import Seccion from "../models/Seccion.js";
import Concepto from "../models/Concepto.js";
import Subconcepto from "../models/Subconcepto.js";
import { Op } from "sequelize";

class conceptoPagoService {
  static async buscarConcepto(texto) {
    // Buscar en SUBCONCEPTOS que es el nivel más específico
    let resultados = await Subconcepto.findAll({
      where: {
        nombre: { [Op.like]: `%${texto}%` },
        es_cobrable: true,
      },
    });

    if (resultados.length) {
      return this.formatearRespuesta("SUBCONCEPTO", resultados);
    }

    // Buscar en CONCEPTOS
    resultados = await Concepto.findAll({
      where: {
        nombre: { [Op.like]: `%${texto}%` },
        es_cobrable: true,
      },
    });

    if (resultados.length) {
      return this.formatearRespuesta("CONCEPTO", resultados);
    }

    // Buscar en SECCIONES
    resultados = await Seccion.findAll({
      where: {
        nombre: { [Op.like]: `%${texto}%` },
        es_cobrable: true,
      },
    });

    if (resultados.length) {
      return this.formatearRespuesta("SECCION", resultados);
    }

    // Buscar en SUBCUENTAS
    resultados = await Subcuenta.findAll({
      where: {
        nombre: { [Op.like]: `%${texto}%` },
        // es_cobrable: true,
      },
    });

    if (resultados.length) {
      return this.formatearRespuesta("SUBCUENTA", resultados);
    }
  }

  // Formatear la respuesta para estandarizar la estructura de los datos
  static formatearRespuesta(tipo, registros) {
    return registros.map((item) => ({
      tipo,
      nombre: item.nombre,
      monto_base: item.monto_base,
    }));
  }
}

export default conceptoPagoService;
