import * as yup from "yup";
import { passwordRequired, usuarioRequired } from "../rules";

export const loginSchema = yup.object({
    password_usuario: passwordRequired,
    nombre_usuario: usuarioRequired,
});