import ConfiguracionService from "../services/configuracionService.js";

class ConfiguracionController {
  static async obtener(req, res) {
    try {
      const config = await ConfiguracionService.obtenerConfiguracion();
      res.json(config);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener configuración",
        error: error.message,
      });
    }
  }

  static async actualizar(req, res) {
    try {
      const config = await ConfiguracionService.actualizarConfiguracion(
        req.body,
      );
      res.json({
        message: "Configuración actualizada correctamente",
        config,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar configuración",
        error: error.message,
      });
    }
  }

  static async actualizarLogo(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se envió logo" });
      }

      const logoUrl = `/uploads/${req.file.filename}`;
      const config = await ConfiguracionService.actualizarLogo(logoUrl);

      res.json({
        message: "Logo actualizado correctamente",
        config,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar logo",
        error: error.message,
      });
    }
  }

  static async actualizarQR(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No se envió código QR" });
      }

      const qrUrl = `/uploads/${req.file.filename}`;
      const config = await ConfiguracionService.actualizarQR(qrUrl);

      res.json({
        message: "Código QR actualizado correctamente",
        config,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar código QR",
        error: error.message,
      });
    }
  }
}

export default ConfiguracionController;
