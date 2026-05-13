// Reglas de validación para campos de tipo string utilizando Yup
import * as yup from "yup";

export const stringRule = yup
    .string()
    .required("Este campo es obligatorio")
    .matches(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "Solo se permiten letras"
    )
    .min(3, "El mínimo son  3 caracteres")
    .max(50, "El máximo son 50 caracteres");