import Configuracion from "../models/Configuracion.js";

class ConfiguracionService {
  static async obtenerConfiguracion() {
    let config = await Configuracion.findOne();

    if (!config) {
      config = await Configuracion.create({
        nombre_municipio: "Ixtlán de Juárez",
      });
    }

    return config;
  }

  static async actualizarConfiguracion(data) {
    const config = await this.obtenerConfiguracion();
    return await config.update(data);
  }

  static async actualizarLogo(logoUrl) {
    const config = await this.obtenerConfiguracion();
    return await config.update({ logo_url: logoUrl });
  }

  static async actualizarQR(qrUrl) {
    const config = await this.obtenerConfiguracion();
    return await config.update({ qr_path: qrUrl });
  }
}

export default ConfiguracionService;
