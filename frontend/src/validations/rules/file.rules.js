import * as yup from "yup";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export const fotoPerfilRule = yup
    .mixed()
    .test(
        "fileSize",
        "La imagen no debe superar los 2MB",
        (value) => {
            if (!value || value.length === 0) return true;
            return value[0].size <= MAX_SIZE;
        }
    )
    .test(
        "fileType",
        "Solo se permiten imágenes",
        (value) => {
            if (!value || value.length === 0) return true;
            return value[0].type.startsWith("image/");
        }
    );