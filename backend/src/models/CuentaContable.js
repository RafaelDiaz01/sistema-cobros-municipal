import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CuentaContable = sequelize.define("cuenta_contable", {
  id_cuenta_contable: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave_cuenta: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default CuentaContable;
