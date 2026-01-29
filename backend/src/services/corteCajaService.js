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
      saldo_final_esperado: saldo_inicial,
      estado: true,
    });
  }

  // Cerrar un corte de caja existente
  static async cerrarCorte(id_corte_caja, id_usuario) {
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

    pagos.forEach((pago) => {
      const monto = Number(pago.monto_total);
      if (pago.metodo_pago === "EFECTIVO") efectivo += monto;
      if (pago.metodo_pago === "TRANSFERENCIA") transferencia += monto;
    });

    const total = efectivo + transferencia;
    const saldoFinalEsperado = Number(corte.saldo_inicial) + efectivo;

    await corte.update({
      fecha_fin: new Date(),
      total_pagos: total,
      total_efectivo: efectivo,
      total_transferencia: transferencia,
      saldo_final_esperado: saldoFinalEsperado,
      estado: false,
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
    });

    if (!corte) {
      throw new Error("No hay un corte de caja activo para este usuario");
    }

    return corte;
  }
}

export default CorteCajaService;
