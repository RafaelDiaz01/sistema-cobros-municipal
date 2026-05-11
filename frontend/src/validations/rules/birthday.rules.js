import * as yup from "yup";

export const birthdateRule = yup
    .date()
    .typeError("La fecha de nacimiento no es válida")
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha no puede ser futura")
    .test(
        "edad-minima",
        "Debe ser mayor de 18 años",
        function (value) {
            if (!value) return false;

            const today = new Date();

            const minAgeDate = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
            );

            return value <= minAgeDate;
        }
    )
    .test(
        "edad-maxima",
        "La fecha de nacimiento no es válida",
        function (value) {
            if (!value) return false;

            const today = new Date();

            const maxAgeDate = new Date(
                today.getFullYear() - 100,
                today.getMonth(),
                today.getDate()
            );

            return value >= maxAgeDate;
        }
    );