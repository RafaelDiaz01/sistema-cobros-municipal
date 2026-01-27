import estimuloFiscalService from "../services/estimuloFiscalService.js";

class estimuloFiscalController {
  // Obtener estimulos por texto
  static async buscar(req, res) {
    try {
      const { texto } = req.query;

      if (!texto) {
        return res.status(400).json({
          message: "Debe proporcionar un texto de búsqueda",
        });
      }

      const resultados = await estimuloFiscalService.buscarEstimulosFiscales(texto);

      res.json(resultados);
    } catch (error) {
      res.status(500).json({
        message: "Error al buscar el estímulo fiscal",
        error: error.message,
      });
    }
  }
  // Obtener todos los estímulos fiscales
  static async obtenerTodos(req, res) {
    try {
      const estimulos = await estimuloFiscalService.obtenerTodos();
      res.json(estimulos);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los estímulos fiscales",
        error: error.message,
      });
    }
  }
}

export default estimuloFiscalController;
