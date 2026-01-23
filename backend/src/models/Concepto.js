import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Concepto = sequelize.define("concepto", {
  id_concepto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave_concepto: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  es_cobrable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  monto_base: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Concepto;
