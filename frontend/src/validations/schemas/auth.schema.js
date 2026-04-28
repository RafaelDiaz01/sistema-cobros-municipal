import * as yup from "yup";
import { passwordRequired } from "../rules";

export const loginSchema = yup.object({
    password_usuario: passwordRequired,
});