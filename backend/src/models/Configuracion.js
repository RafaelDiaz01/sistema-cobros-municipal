import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Configuracion = sequelize.define(
  "configuracion",
  {
    id_configuracion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_municipio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rfc_municipio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    qr_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "configuracion",
    freezeTableName: true,
  },
);

export default Configuracion;
