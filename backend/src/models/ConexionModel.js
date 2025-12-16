import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Conexion = sequelize.define("conexiones", {
  id_conexion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_contribuyente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "contribuyentes", // nombre de la tabla padre
      key: "id_contribuyente",
    },
  },
  cuenta: {
    // Número de cuenta asociado a la conexión
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  tipo: {
    // Tipo de conexión (ej. agua potable, drenaje)
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  uso: {
    // Uso del servicio (ej. doméstico, comercial)
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  calle: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  numero_calle: {
    type: DataTypes.STRING(20),
  },
  barrio: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fecha_conexion: {
    // Fecha en la que se realizó la conexión
    type: DataTypes.DATEONLY,
  },
});

export default Conexion;
