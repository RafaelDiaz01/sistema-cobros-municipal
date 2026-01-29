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

  id_corte_caja: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  tipo_referencia: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  concepto_pago: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },

  monto: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false, // monto FINAL pagado
  },

  periodo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  descuento: {
    type: DataTypes.STRING(20),
    defaultValue: 0.0,
  },

  metodo_pago: {
    type: DataTypes.STRING(20),
    allowNull: false,
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

  descripcion: {
    type: DataTypes.STRING(255),
  },
});

export default Pago;
