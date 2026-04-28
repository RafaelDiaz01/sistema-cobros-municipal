import * as yup from "yup";

// Regla básica (login)
export const passwordRequired = yup
    .string()
    .required("La contraseña es obligatoria");

// Regla estándar (puedes reutilizar en varios lados)
export const passwordBasic = yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres");

// Regla fuerte (para cambio/registro)
export const passwordStrong = yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/\d/, "Debe contener al menos un número");

// Confirmación de contraseña
export const confirmPassword = (refField = "password") =>
    yup
        .string()
        .oneOf([yup.ref(refField)], "Las contraseñas no coinciden")
        .required("Debes confirmar la contraseña");