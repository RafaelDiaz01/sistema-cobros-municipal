import * as yup from "yup";

export const requiredSelectRule = yup
    .string()
    .required("Este campo es obligatorio")
    .trim()
    .min(1, "Debe seleccionar una opción");