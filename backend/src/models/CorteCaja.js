import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CorteCaja = sequelize.define("corte_caja", {
  id_corte_caja: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  saldo_inicial: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  total_pagos: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  total_efectivo: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  total_transferencia: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  saldo_final_esperado: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  observaciones: {
    type: DataTypes.TEXT,
  },
});

export default CorteCaja;
