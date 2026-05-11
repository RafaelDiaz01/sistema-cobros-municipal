import * as yup from "yup";

export const rfcRule = yup
    .string()
    .uppercase()
    .matches(
        /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/,
        "El RFC no tiene un formato válido"
    )
    .min(12, "El RFC debe tener 12 o 13 caracteres")
    .max(13, "El RFC debe tener 12 o 13 caracteres");