// Regla para validar claves en subconceptos, conceptos, etc.
import * as yup from "yup";

export const keyRule = yup
    .string()
    .required("La clave es obligatoria")
    .matches(
        /^\d+$/,
        "La clave solo puede contener números"
    )
    .max(
        15,
        "La clave no puede exceder 15 dígitos"
    )
    .test(
        "positive-number",
        "La clave debe ser un número positivo",
        (value) => {
            if (!value) return false;

            return Number(value) > 0;
        }
    );