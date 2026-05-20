import * as yup from "yup";

export const amountRule = yup
    .number()
    .typeError("Ingrese un monto válido")
    .required("El monto es obligatorio")
    .min(0.01, "El monto debe ser mayor a 0")
    .test(
        "max-decimals",
        "Solo se permiten 2 decimales",
        (value) => {
            if (value === undefined || value === null) {
                return false;
            }

            return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }
    );