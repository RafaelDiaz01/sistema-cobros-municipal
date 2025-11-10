import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/ContribuyenteModel.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos exitosa");

    await sequelize.sync({ force: true });
    console.log("✅ Tablas sincronizadas correctamente");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();
