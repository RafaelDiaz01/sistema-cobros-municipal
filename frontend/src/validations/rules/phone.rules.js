// Reglas de validación para campos de teléfono utilizando Yup
import * as yup from "yup";

export const phoneRule = yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]{10}$/, "Debe tener 10 dígitos");