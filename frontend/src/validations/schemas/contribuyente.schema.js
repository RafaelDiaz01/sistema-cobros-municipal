// Esquema de validación para el formulario de contribuyente utilizando Yup
import * as yup from "yup";
import { nameRule, lastNameRule, phoneRule, rfcRule, birthdateRule } from "../rules";

export const createContribuyenteSchema = yup.object({
    nombre: nameRule,
    apellido_paterno: lastNameRule,
    apellido_materno: lastNameRule,
    telefono: phoneRule,
    rfc: rfcRule,
    fecha_nacimiento: birthdateRule,
});