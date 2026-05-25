import * as yup from "yup";

export const autocompleteRule = yup
    .object()
    .nullable()
    .required("Este campo es obligatorio");