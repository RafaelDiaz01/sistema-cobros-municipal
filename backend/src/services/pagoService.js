import Pago from "../models/Pago.js";
import Subcuenta from "../models/Subcuenta.js";
import Seccion from "../models/Seccion.js";
import Concepto from "../models/Concepto.js";
import Subconcepto from "../models/Subconcepto.js";

const MODELOS_COBRO = {
  SUBCUENTA: Subcuenta,
  SECCION: Seccion,
  CONCEPTO: Concepto,
  SUBCONCEPTO: Subconcepto,
};

class PagoService {
  /**
   * Obtiene el concepto cobrable y valida que exista
   */
  static async obtenerReferencia(tipo_referencia, id_referencia) {
    const Modelo = MODELOS_COBRO[tipo_referencia];

    if (!Modelo) {
      throw new Error("Tipo de referencia inválido");
    }

    const referencia = await Modelo.findByPk(id_referencia);

    if (!referencia) {
      throw new Error("El concepto a cobrar no existe");
    }

    if (!referencia.es_cobrable) {
      throw new Error("El concepto seleccionado no es cobrable");
    }

    return referencia;
  }

  /**
   * Registra un pago
   */
  static async registrarPago(data) {
    const {
      id_contribuyente,
      tipo_referencia,
      concepto_pago,
      monto,
      periodo,
      descuento,
      metodo_pago,
      descripcion,
      fecha_pago,
    } = data;

    // Validar referencia
    // const referencia = await this.obtenerReferencia(
    //   tipo_referencia,
    //   id_referencia,
    // );

    // Validar monto
    // if (Number(monto) <= 0) {
    //   throw new Error("El monto debe ser mayor a cero");
    // }

    // Crear pago
    const pago = await Pago.create({
      id_contribuyente,
      tipo_referencia,
      concepto_pago,
      monto,
      periodo,
      descuento,
      metodo_pago,
      folio: "REC-TEMP",
      descripcion,
      fecha_pago,
    });

    const year = new Date().getFullYear();
    const folio = `REC-${year}-${pago.id_pago}`;

    // Actualizar folio con el id_pago
    pago.folio = folio;
    await pago.save();

    return {
      pago,
      //referencia,
    };
  }

  /**
   * Listar pagos (para corte de caja / historial)
   */
  static async listarPagos(filtros = {}) {
    return await Pago.findAll({
      where: filtros,
      order: [["fecha_pago", "DESC"]],
    });
  }

  /**
   * Obtener pago por ID
   */
  static async obtenerPagoPorId(id_pago) {
    const pago = await Pago.findByPk(id_pago);

    if (!pago) {
      throw new Error("Pago no encontrado");
    }

    return pago;
  }
}

export default PagoService;
