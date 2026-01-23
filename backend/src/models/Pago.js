import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Pago = sequelize.define("pago", {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_contribuyente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  tipo_referencia: {
    type: DataTypes.ENUM("SUBCUENTA", "SECCION", "CONCEPTO", "SUBCONCEPTO"),
    allowNull: false,
  },

  id_referencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  monto: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false, // monto FINAL pagado
  },

  fecha_pago: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

  folio: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },

  forma_pago: {
    type: DataTypes.ENUM("EFECTIVO", "TRANSFERENCIA"),
    allowNull: false,
  },

  observaciones: {
    type: DataTypes.STRING(255),
  },
});

export default Pago;
