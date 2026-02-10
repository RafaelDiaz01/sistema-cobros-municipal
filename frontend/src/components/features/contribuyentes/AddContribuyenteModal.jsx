import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, MapPin } from "lucide-react";

import BaseModal from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";

import {
  createContribuyente,
  updateContribuyente,
} from "../../../services/contribuyentesService.jsx";

import { showToast } from "../../../utils/alerts/toast.js";

export default function AddContribuyenteModal({
  onClose,
  contribuyente,
  onSuccess,
}) {
  const isEdit = Boolean(contribuyente);

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

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar contribuyente", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <BaseModal
      title={isEdit ? "Editar Contribuyente" : "Agregar Nuevo Contribuyente"}
      description={
        isEdit
          ? "Modifique los datos del contribuyente."
          : "Complete el formulario para registrar un nuevo ciudadano en el sistema."
      }
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      submitText={isEdit ? "Actualizar Contribuyente" : "Guardar Contribuyente"}
      cancelText="Cancelar"
      isSubmitting={isSubmitting}
      size="xl"
    >
      <Stack gap="gap-8">
        {/* DATOS PERSONALES */}
        <Section icon={<User size={18} />} title="Datos Personales">
          <Grid cols={3}>
            <Input
              {...register("nombre", { required: true })}
              label="Nombre(s)"
              placeholder="Ej. Juan Carlos"
              error={errors.nombre && "Campo obligatorio"}
            />

            <Input
              {...register("apellido_paterno", { required: true })}
              label="Apellido Paterno"
              placeholder="Ej. Pérez"
              error={errors.apellido_paterno && "Campo obligatorio"}
            />

            <Input
              {...register("apellido_materno", { required: true })}
              label="Apellido Materno"
              placeholder="Ej. López"
              error={errors.apellido_materno && "Campo obligatorio"}
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
              error={errors.rfc && "RFC inválido"}
            />

            <Input
              {...register("telefono", { required: true })}
              label="Teléfono"
              placeholder="9515801224"
              error={errors.telefono && "Campo obligatorio"}
            />
          </Grid>
        </Section>

        <hr className="border-[var(--color-borde)]" />

        {/* DOMICILIO */}
        <Section icon={<MapPin size={18} />} title="Domicilio">
          <Grid cols={3}>
            <Input
              {...register("calle", { required: true })}
              label="Calle"
              placeholder="Ej. Av. Independencia"
              error={errors.calle && "Campo obligatorio"}
            />

            <Input
              {...register("numero_calle", { required: true })}
              label="Número Exterior / Interior"
              placeholder="Ej. 15"
              error={errors.numero_calle && "Campo obligatorio"}
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
              error={errors.barrio && "Campo obligatorio"}
            />
          </Grid>
        </Section>
      </Stack>
    </BaseModal>
  );
}
