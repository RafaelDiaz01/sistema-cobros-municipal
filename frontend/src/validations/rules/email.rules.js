import * as yup from "yup";

export const emailRule = yup
    .string()
    .required("El correo electrónico es obligatorio")
    .email("Debe ser un correo electrónico válido")
    .max(100, "El Máximo 100 caracteres");