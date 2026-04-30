// Esquema de validación para el formulario de creación/edición de usuario utilizando Yup
import * as yup from "yup";
import { nameRule, phoneRule, passwordRequired, passwordStrong, confirmPassword, passwordNotSame } from "../rules";

export const createUserSchema = yup.object({
  nombre_completo: nameRule,
  telefono: phoneRule,
});

export const changePasswordSchema = yup.object({
  password_usuario: passwordRequired,
  password_nueva: passwordStrong.concat(passwordNotSame("password_usuario")),
  password_confirm: confirmPassword("password_nueva"),
});