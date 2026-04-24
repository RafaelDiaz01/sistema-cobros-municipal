// Esquema de validación para el formulario de creación/edición de usuario utilizando Yup
import * as yup from "yup";
import { nameRule, phoneRule } from "../rules";

export const createUserSchema = yup.object({
  nombre_completo: nameRule,
  telefono: phoneRule,
});