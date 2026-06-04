import * as yup from "yup";

export const streetNumberRule = yup
    .string()
    .required("El número de calle es obligatorio")
    .transform((value) => value?.trim().toUpperCase())
    .test(
        "street-number",
        "Solo números del 1 al 99 o SN",
        (value) => {
            if (!value) return false;

            // Permitir SN o S/N
            if (value === "SN" || value === "S/N") {
                return true;
            }

            // Validar números del 1 al 99
            const numero = Number(value);

            return (
                Number.isInteger(numero) &&
                numero >= 1 &&
                numero <= 99
            );
        }
    );