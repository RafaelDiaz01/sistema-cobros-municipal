// Esquema de validación para el formulario de contribuyente utilizando Yup
import * as yup from "yup";
import { stringRule, phoneRule, rfcRule, birthdateRule, streetNumberRule, requiredSelectRule } from "../rules";

export const createContribuyenteSchema = yup.object({
    nombre: stringRule,
    apellido_paterno: stringRule,
    apellido_materno: stringRule,
    telefono: phoneRule,
    rfc: rfcRule,
    fecha_nacimiento: birthdateRule,
    calle: stringRule,
    numero_calle: streetNumberRule,
    barrio: requiredSelectRule,
});