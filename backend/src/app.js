import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API del Sistema Web de Cobros Municipal funcionando 🚀");
});


const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos correctamente");

    // Sincronizar modelos → crea las tablas si no existen
    await sequelize.sync({ force: true });
    console.log("✅ Tablas sincronizadas con la base de datos");

    
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
};

startServer();