import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Conexion = sequelize.define("conexiones", {
  id_conexion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default Conexion;
