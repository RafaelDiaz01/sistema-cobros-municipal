import * as yup from "yup";
import { autocompleteRule } from "../rules";

export const cobrarSchema = yup.object({
    id_contribuyente: autocompleteRule,
});