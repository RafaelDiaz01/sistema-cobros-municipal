import * as yup from "yup";

// Regla básica (login)
export const passwordRequired = yup
    .string()
    .required("La contraseña es obligatoria");

// Regla básica para usuario (login)
export const usuarioRequired = yup
    .string()
    .required("El usuario es obligatorio")
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(50, "El usuario debe tener como máximo 50 caracteres");

// Regla estándar
export const passwordBasic = yup
    .string()
    .required("La contraseña es obligatoria")
    .min(8, "Debe tener al menos 8 caracteres");

// Regla fuerte (para registro o cambio de contraseña)
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

// Regla para evitar que la contraseña nueva sea igual a la actual
export const passwordNotSame = (refField = "password_usuario") =>
    yup
        .string()
        .notOneOf([yup.ref(refField)], "La nueva contraseña no puede ser igual a la actual")
        .required("La nueva contraseña es obligatoria");