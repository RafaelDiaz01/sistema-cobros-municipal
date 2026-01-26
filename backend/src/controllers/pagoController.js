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
      const pagos = await PagoService.listarPagos(req.query);

      res.json(pagos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener pagos",
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
}

export default PagoController;
