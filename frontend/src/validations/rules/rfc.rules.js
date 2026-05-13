import * as yup from "yup";

export const rfcRule = yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .test(
        "rfc-format",
        "El RFC no tiene un formato válido",
        (value) => {
            if (!value) return true;

            return /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/.test(value);
        }
    );