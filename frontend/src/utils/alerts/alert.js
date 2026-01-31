import Swal from "sweetalert2";

export const alertConfirmation = async (title, text, icon) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    iconColor: "var(--color-primario)",
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "var(--color-acento)",
    cancelButtonColor: "var(--color-cancelar)",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
}