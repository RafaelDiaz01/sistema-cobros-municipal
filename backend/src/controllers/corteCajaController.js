import CorteCajaService from "../services/corteCajaService.js";

class CorteCajaController {
  // Abrir un nuevo corte de caja
  static async abrir(req, res) {
    try {
      const { id_usuario, saldo_inicial } = req.body;

      const corte = await CorteCajaService.abrirCorte(id_usuario, saldo_inicial);

      res.status(201).json(corte);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Cerrar un corte de caja existente
  static async cerrar(req, res) {
    try {
      const { id } = req.params;
      const { id_usuario } = req.body;

      const corte = await CorteCajaService.cerrarCorte(id, id_usuario);

      res.json(corte);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Listar todos los cortes de caja de un usuario
  static async listarPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const cortes = await CorteCajaService.listarPorUsuario(id_usuario);
      res.json(cortes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Obtener datos de el corte activo de un usuario
  static async obtenerCorteActivo(req, res) {
    try {
      const { id_usuario } = req.params;
      const corte = await CorteCajaService.obtenerCorteActivo(id_usuario);
      res.json(corte);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default CorteCajaController;
