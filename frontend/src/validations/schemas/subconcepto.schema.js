import * as yup from "yup";
import { stringRule, amountRule, requiredSelectRule, keyRule } from "../rules/index.js";

export const subconceptoSchema = yup.object({
    nombre: stringRule,
    clave_subconcepto: keyRule,
    monto_base: amountRule,
    periodicidad: requiredSelectRule
});