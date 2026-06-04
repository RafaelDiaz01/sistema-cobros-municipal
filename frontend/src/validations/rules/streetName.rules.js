import * as yup from "yup";

export const streetNameRule = yup
    .string()
    .required("El nombre de la calle es obligatorio")
    .trim()
    .min(3, "El nombre de la calle es demasiado corto")
    .max(100, "El nombre de la calle no puede exceder 100 caracteres")
    .matches(
        /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ0-9\s.\-]+$/,
        "Datos no válidos"
    )
    .test(
        "contains-letter",
        "Datos no válidos",
        (value) => {
            if (!value) return false;
            return /[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]/.test(value);
        }
    );