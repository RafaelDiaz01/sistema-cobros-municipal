import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subcuenta = sequelize.define("subcuenta", {
  id_subcuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave_subcuenta: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  es_cobrable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  monto_base: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Subcuenta;
