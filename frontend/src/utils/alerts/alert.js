import Swal from "sweetalert2";

// Si useInput es true, muestra un input para monto inicial y valida que sea un número positivo
export const alertConfirmation = async (
  title,
  text,
  icon,
  confirmButtonText,
  cancelButtonText,
  useInput = false,
) => {
  const swalOptions = {
    title,
    text,
    icon,
    iconColor: "var(--color-primario)",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "var(--color-primario)",
    cancelButtonColor: "var(--color-cancelar)",
    confirmButtonText: confirmButtonText || "Sí",
    cancelButtonText: cancelButtonText || "No",
  };

  if (useInput) {
    swalOptions.input = "number";
    swalOptions.inputLabel = "Ingrese el monto inicial del corte de caja";
    swalOptions.inputPlaceholder = "Ej. 1000";
    swalOptions.inputAttributes = {
      min: 0,
      step: 1,
      autocomplete: "off",
      inputMode: "numeric",
    };
    swalOptions.inputValidator = (value) => {
      if (!value) {
        return "Debe ingresar un monto inicial";
      }
      if (
        isNaN(value) ||
        Number(value) < 0 ||
        !Number.isInteger(Number(value))
      ) {
        return "El monto debe ser un número entero positivo";
      }
      return null;
    };
    swalOptions.customClass = {
      input: "swal-custom-input",
    };
  }

  const result = await Swal.fire(swalOptions);

  if (useInput) {
    return result.isConfirmed ? Number(result.value) : null;
  }
  return result.isConfirmed;
};
