import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, User, MapPin, FolderUp } from "lucide-react";
import withReactContent from "sweetalert2-react-content";
import Section from "./Section.jsx";
import Grid from "./Grid.jsx";
import Input from "./Input.jsx";
import Select from "./Select.jsx";
import Upload from "./Upload.jsx";
import Stack from "../../layouts/Stack.jsx";
import { createContribuyente } from "../../../services/contribuyentesService.jsx";
import { updateContribuyente } from "../../../services/contribuyentesService.jsx";
import { showToast } from "../../../utils/alerts/toast.js";

export default function AddContribuyenteModal({
  onClose,
  contribuyente,
  onSuccess,
}) {
  const isEdit = Boolean(contribuyente);

  // Usando React Hook Form para manejar el formulario
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEdit && contribuyente) {
      reset({
        nombre: contribuyente.nombre,
        apellido_paterno: contribuyente.apellido_paterno,
        apellido_materno: contribuyente.apellido_materno,
        fecha_nacimiento: contribuyente.fecha_nacimiento?.split("T")[0],
        rfc: contribuyente.rfc,
        telefono: contribuyente.telefono,
        calle: contribuyente.calle,
        numero_calle: contribuyente.numero_calle,
        barrio: contribuyente.barrio,
      });
    }
  }, [isEdit, contribuyente, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateContribuyente(contribuyente.id_contribuyente, data);
        showToast("success", "Contribuyente actualizado exitosamente");
      } else {
        await createContribuyente(data);
        showToast("success", "Contribuyente guardado exitosamente");
      }
      onSuccess(); // notifica al padre para refrescar la lista
      onClose(); // cierra el modal
    } catch (error) {
      console.error(
        "Error al guardar contribuyente (AddContribuyenteModal)",
        error
      );
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh] animated-fade-up">
        {/* HEADER */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[var(--color-borde)]">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEdit ? "Editar Contribuyente" : "Agregar Nuevo Contribuyente"}
            </h2>
            <p className="text-sm text-gray-500">
              {isEdit
                ? "Modifique los datos del contribuyente."
                : "Complete el formulario para registrar un nuevo ciudadano en el sistema."}
            </p>
          </div>

          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-black" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 min-h-0"
        >
          {/* BODY */}
          <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6">
            <Stack gap="gap-8">
              {/* DATOS PERSONALES */}
              <Section icon={<User size={18} />} title="Datos Personales">
                <Grid>
                  <Input
                    {...register("nombre", { required: true })}
                    label="Nombre(s)"
                    placeholder="Ej. Juan Carlos"
                  />
                  <Input
                    {...register("apellido_paterno", { required: true })}
                    label="Apellido Paterno"
                    placeholder="Ej. Pérez"
                  />
                  <Input
                    {...register("apellido_materno", { required: true })}
                    label="Apellido Materno"
                    placeholder="Ej. López"
                  />
                  <Input
                    {...register("fecha_nacimiento")}
                    type="date"
                    label="Fecha de Nacimiento"
                  />
                  <Input
                    {...register("rfc", {
                      required: true,
                      minLength: 13,
                      maxLength: 13,
                    })}
                    label="RFC"
                    placeholder="DILK040315MQ7"
                    helper="Ingrese la homoclave si está disponible."
                  />
                  <Input
                    {...register("telefono", { required: true })}
                    label="Teléfono"
                    placeholder="9515801224"
                  />
                </Grid>
              </Section>

              <hr className="border-[var(--color-borde)]" />

              {/* DOMICILIO */}
              <Section icon={<MapPin size={18} />} title="Domicilio">
                <Grid cols={2}>
                  <Input
                    {...register("calle", { required: true })}
                    label="Calle"
                    placeholder="Ej. Av. Independencia"
                  />
                  <Input
                    {...register("numero_calle", { required: true })}
                    label="Número Exterior / Interior"
                    placeholder="Ej. 15"
                  />
                  <Select
                    label="Barrio / Colonia"
                    options={[
                      "San Pedro",
                      "San Francisco",
                      "La Asunción",
                      "La Soledad",
                    ]}
                    {...register("barrio", { required: true })}
                  />
                </Grid>
              </Section>

              <hr className="border-[var(--color-borde)]" />

              {/* DOCUMENTACIÓN */}
              <Section icon={<FolderUp size={18} />} title="Documentación">
                <Upload />
              </Section>
            </Stack>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-4 px-8 py-5 border-t border-[var(--color-borde)] bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[var(--color-cancelar)] text-[var(--color-text-secundario)] text-sm"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-[var(--color-acento)] text-[var(--color-text-secundario)] text-sm font-medium"
            >
              {isEdit ? "Actualizar Contribuyente" : "Guardar Contribuyente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
