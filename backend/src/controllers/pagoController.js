import PagoService from "../services/pagoService.js";

class PagoController {
  static async registrar(req, res) {
    try {
      const resultado = await PagoService.registrarPago(req.body);

      res.status(201).json({
        message: "Pago registrado correctamente",
        pago: resultado.pago,
        concepto: resultado.referencia,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error al registrar el pago",
        error: error.message,
      });
    }
  }

  static async listar(req, res) {
    try {
      const pagos = await PagoService.listarPagos();
      res.json(pagos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener pagos",
        error: error.message,
      });
    }
  }

  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const pago = await PagoService.obtenerPagoPorId(id);

      res.json(pago);
    } catch (error) {
      res.status(404).json({
        message: error.message,
      });
    }
  }

  // Obtener pagos por corte de caja
  static async obtenerPagosPorCorte(req, res) {
    try {
      const { id_corte } = req.params;
      const pagos = await PagoService.obtenerPagosPorCorte(id_corte);

      res.json(pagos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener pagos por corte",
        error: error.message,
      });
    }
  }
}

export default PagoController;
