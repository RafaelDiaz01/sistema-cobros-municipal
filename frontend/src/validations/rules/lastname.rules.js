// Regla de validación para el apellido utilizando Yup
import * as yup from "yup";

export const lastNameRule = yup
    .string()
    .required("El apellido es obligatorio")
    .matches(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "Solo se permiten letras"
    )
    .min(3, "El mínimo son 3 caracteres")
    .max(20, "El máximo son 20 caracteres");