import CorteCaja from "../models/CorteCaja.js";
import Pago from "../models/Pago.js";

class CorteCajaService {
  // Abrir un nuevo corte de caja para un usuario
  static async abrirCorte(id_usuario, saldo_inicial) {
    if (saldo_inicial < 0) {
      throw new Error("El saldo inicial no puede ser negativo");
    }

    const corteActivo = await CorteCaja.findOne({
      where: {
        id_usuario,
        estado: true,
      },
    });

    if (corteActivo) {
      throw new Error("El usuario ya tiene un corte de caja abierto");
    }

    const ahora = new Date();

    return await CorteCaja.create({
      id_usuario,
      fecha_inicio: ahora,
      fecha_fin: ahora,
      saldo_inicial,
      total_pagos: 0,
      total_efectivo: 0,
      total_transferencia: 0,
      saldo_total: 0,
      saldo_final_esperado: saldo_inicial,
      saldo_real: 0,
      diferencia: 0,
      estado: true,
    });
  }

  // Cerrar un corte de caja existente
  static async cerrarCorte(id_corte_caja, id_usuario, saldo_real, observaciones) {
    const corte = await CorteCaja.findOne({
      where: {
        id_corte_caja,
        id_usuario,
        estado: true,
      },
    });

    if (!corte) {
      throw new Error("Corte no encontrado o no pertenece al usuario");
    }

    const pagos = await Pago.findAll({
      where: { id_corte_caja },
    });

    let efectivo = 0;
    let transferencia = 0;
    let saldoTotal = 0;

    pagos.forEach((pago) => {
      const monto = Number(pago.monto);
      saldoTotal += monto;
      if (pago.metodo_pago === "Efectivo") efectivo += monto;
      if (pago.metodo_pago === "Transferencia") transferencia += monto;
    });

    const totalPagos = pagos.length;
    const saldoFinalEsperado = Number(corte.saldo_inicial) + efectivo;
    const diferencia = saldo_real - saldoFinalEsperado;

    await corte.update({
      fecha_fin: new Date(),
      total_pagos: totalPagos,
      total_efectivo: efectivo,
      total_transferencia: transferencia,
      saldo_total: saldoTotal,
      saldo_final_esperado: saldoFinalEsperado,
      saldo_real: saldo_real,
      diferencia: diferencia,
      estado: false,
      observaciones: observaciones,
    });

    return corte;
  }

  // Listar todos los cortes de caja de un usuario
  static async listarPorUsuario(id_usuario) {
    return await CorteCaja.findAll({
      where: { id_usuario },
      order: [["fecha_inicio", "DESC"]],
    });
  }

  // Obtener datos del corte activo de un usuario
  static async obtenerCorteActivo(id_usuario) {
    const corte = await CorteCaja.findOne({
      where: {
        id_usuario,
        estado: true,
      },
      include: [
        {
          model: Pago,
          as: "pagos",
          where: {
            id_corte_caja: CorteCaja.sequelize.col("corte_caja.id_corte_caja"),
          },
          required: false,
        },
      ],
    });

    if (!corte) {
      throw new Error("No hay un corte de caja activo para este usuario");
    }

    // Calcular los totales
    let total_efectivo = 0;
    let total_transferencia = 0;
    let saldo_total = 0;

    if (corte.pagos && corte.pagos.length > 0) {
      corte.pagos.forEach((pago) => {
        const monto = Number(pago.monto || 0);
        saldo_total += monto;
        if (pago.metodo_pago === "Efectivo") total_efectivo += monto;
        if (pago.metodo_pago === "Transferencia") total_transferencia += monto;
      });
    }

    // Devuelve los datos del corte, pero con los totales calculados
    return {
      ...corte.toJSON(),
      total_efectivo,
      total_transferencia,
      saldo_total,
      total_pagos: corte.pagos ? corte.pagos.length : 0,
      saldo_final_esperado: Number(corte.saldo_inicial) + total_efectivo,
    };
  }
}

export default CorteCajaService;
