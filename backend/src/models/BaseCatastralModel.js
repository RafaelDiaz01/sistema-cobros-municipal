import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const BaseCatastral = sequelize.define("bases_catastrales", {
  id_base_catastral: {
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
    // Número de cuenta catastral
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  valor: {
    // Valor total de la base catastral
    type: DataTypes.DECIMAL(12, 2), // Ejemplo 9999999999.99
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
  impuesto_calculado: {
    // Monto de impuesto predial calculado
    type: DataTypes.DECIMAL(12, 2), // Ejemplo 9999999999.99
    allowNull: false,
  },
  fecha_avaluo: {
    // Fecha del último avalúo realizado
    type: DataTypes.DATEONLY
  }  
});

export default BaseCatastral;
