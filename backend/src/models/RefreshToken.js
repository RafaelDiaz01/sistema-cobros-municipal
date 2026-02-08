import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const RefreshToken = sequelize.define(
  "refresh_token",
  {
    id_refresh_token: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiracion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
  }
);

export default RefreshToken;
