// Esquema de validación para el formulario de contribuyente utilizando Yup
import * as yup from "yup";
import { stringRule, phoneRule, rfcRule, birthdateRule } from "../rules";

export const createContribuyenteSchema = yup.object({
    nombre: stringRule,
    apellido_paterno: stringRule,
    apellido_materno: stringRule,
    telefono: phoneRule,
    rfc: rfcRule,
    fecha_nacimiento: birthdateRule,
});