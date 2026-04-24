// Reglas de validación para campos de tipo string utilizando Yup
import * as yup from "yup";

export const nameRule = yup
    .string()
    .required("El nombre es obligatorio")
    .matches(
        /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
        "Solo se permiten letras"
    )
    .min(3, "El mínimo 3 caracteres")
    .max(50, "El Máximo 50 caracteres");