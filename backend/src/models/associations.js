import Contribuyente from "./ContribuyenteModel.js";
import Establecimiento from "./EstablecimientoModel.js";
import BaseCatastral from "./BaseCatastralModel.js";
import Conexion from "./ConexionModel.js";
import CuentaContable from "./CuentaContable.js";
import Subcuenta from "./Subcuenta.js";
import Seccion from "./Seccion.js";
import Concepto from "./Concepto.js";
import Subconcepto from "./Subconcepto.js";
import Pago from "./Pago.js";
import CorteCaja from "./CorteCaja.js";
import Usuario from "./UsuarioModel.js";

// =============================
// RELACIÓN CONTRIBUYENTE - ESTABLECIMIENTOS
// =============================

// Un Contribuyente tiene muchos Establecimientos
Contribuyente.hasMany(Establecimiento, {
  foreignKey: "id_contribuyente",
  as: "establecimientos",
});

// Un Establecimiento pertenece a un Contribuyente
Establecimiento.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente",
});

// =============================
// RELACIÓN CONTRIBUYENTE - BASES CATASTRALES
// =============================

// Un Contribuyente tiene muchas Bases Catastrales
Contribuyente.hasMany(BaseCatastral, {
  foreignKey: "id_contribuyente",
  as: "bases_catastrales",
});

// Una Base Catastral pertenece a un Contribuyente
BaseCatastral.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente",
});

// =============================
// RELACIÓN CONTRIBUYENTE - CONEXIONES
// =============================

// Un contribuyente tiene muchas Conexiones
Contribuyente.hasMany(Conexion, {
  foreignKey: "id_contribuyente",
  as: "conexiones",
});

// Una conexión pertenece a un Contribuyente
Conexion.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
  as: "contribuyente",
});

// =============================
// RELACIÓN CUENTA CONTABLE - SUBCUENTA
// =============================

// Una cuenta contable tiene muchas subcuentas
CuentaContable.hasMany(Subcuenta, {
  foreignKey: "id_cuenta_contable",
});

// Una subcuenta pertenece a una cuenta contable
Subcuenta.belongsTo(CuentaContable, {
  foreignKey: "id_cuenta_contable",
});

// =============================
// RELACIÓN SUBCUENTA - SECCION
// =============================

// Una subcuenta tiene muchas secciones
Subcuenta.hasMany(Seccion, {
  foreignKey: "id_subcuenta",
});

// Una sección pertenece a una subcuenta
Seccion.belongsTo(Subcuenta, {
  foreignKey: "id_subcuenta",
});

// =============================
// RELACIÓN SECCION - CONCEPTO
// =============================

// Una sección tiene muchos conceptos
Seccion.hasMany(Concepto, {
  foreignKey: "id_seccion",
});

// Un concepto pertenece a una sección
Concepto.belongsTo(Seccion, {
  foreignKey: "id_seccion",
});

// =============================
// RELACIÓN CONCEPTO - SUBCONCEPTO
// =============================

// Un concepto tiene muchos subconceptos
Concepto.hasMany(Subconcepto, {
  foreignKey: "id_concepto",
});

// Un subconcepto pertenece a un concepto
Subconcepto.belongsTo(Concepto, {
  foreignKey: "id_concepto",
});

// =============================
// RELACIÓN CONTRIBUYENTE - PAGO
// =============================

// Un Contribuyente tiene muchos Pagos
Contribuyente.hasMany(Pago, {
  foreignKey: "id_contribuyente",
});

// Un Pago pertenece a un Contribuyente
Pago.belongsTo(Contribuyente, {
  foreignKey: "id_contribuyente",
});

// =============================
// RELACIÓN CORTE DE CAJA - PAGO
// =============================

// Un Corte de Caja tiene muchos Pagos
CorteCaja.hasMany(Pago, {
  foreignKey: "id_corte_caja",
});

// Un Pago pertenece a un Corte de Caja
Pago.belongsTo(CorteCaja, {
  foreignKey: "id_corte_caja",
});

// =============================
// RELACIÓN USUARIO - CORTE DE CAJA
// =============================

// Un Usuario tiene muchos Cortes de Caja
Usuario.hasMany(CorteCaja, {
  foreignKey: "id_usuario",
});

// Un Corte de Caja pertenece a un Usuario
CorteCaja.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});

export {
  Contribuyente,
  Establecimiento,
  BaseCatastral,
  Conexion,
  CuentaContable,
  Subcuenta,
  Seccion,
  Concepto,
  Subconcepto,
  Pago,
  CorteCaja,
  Usuario,
};
