import Swal from "sweetalert2";

export const alertConfirmation = async (title, text, icon) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: "var(--color-acento)",
    cancelButtonColor: "var(--color-cancelar)",
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
}