import conceptoPagoService from "../services/conceptoPagoService.js";

class conceptoPagoController {
  static async buscar(req, res) {
    try {
      const { texto } = req.query;

      if (!texto) {
        return res.status(400).json({
          message: "Debe proporcionar un texto de búsqueda",
        });
      }

      const resultados = await conceptoPagoService.buscarConcepto(texto);

      res.json(resultados);
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar el concepto de pago",
        error: error.message,
      });
    }
  }
}

export default conceptoPagoController;
