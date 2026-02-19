import PagoService from "../services/pagoService.js";
import { generarReciboPDF } from "../services/pdfService.js";

class PagoController {
  static async registrar(req, res) {
    try {
      const id_usuario = req.user.id_usuario;
      const resultado = await PagoService.registrarPago(
        id_usuario,
        req.body,
        res,
      );

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

  // Obtener pagos hechos por usuario
  static async obtenerPagosPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const pagos = await PagoService.obtenerPagosPorUsuario(id_usuario);

      res.json(pagos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener pagos por usuario",
        error: error.message,
      });
    }
  }

  // Descargar recibo en PDF
  static async descargarRecibo(req, res) {
    try {
      const { id } = req.params;
      const pago = await PagoService.obtenerPagoPorId(id);
      const pdfBytes = await generarReciboPDF(pago);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${pago.folio}.pdf`,
      );

      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error("Error generando PDF:", error);
      res.status(500).json({ message: "Error generando PDF" });
    }
  }
}

export default PagoController;
