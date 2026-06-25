import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, MapPin } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContribuyenteSchema } from "../../../validations/schemas/contribuyente.schema.js";
import { useCreateContribuyenteMutation } from "../../../hooks/contribuyentes/useCreateContribuyenteMutation.js";
import { useUpdateContribuyenteMutation } from "../../../hooks/contribuyentes/useUpdateContribuyenteMutation.js";
import { showToast } from "../../../utils/alerts/toast.js";
import BaseModal from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import InputPhone from "../../modals/InputPhone.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddContribuyenteModal({ isOpen, onClose, onSuccess, contribuyente }) {
  const isEdit = Boolean(contribuyente);

  const createMutation = useCreateContribuyenteMutation();
  const updateMutation = useUpdateContribuyenteMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createContribuyenteSchema),
    defaultValues: {
      fecha_nacimiento: "",
    },
  });

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
        await updateMutation.mutateAsync({ id: contribuyente.id_contribuyente, data });
        showToast("success", "Contribuyente actualizado exitosamente");
      } else {
        await createMutation.mutateAsync(data);
        showToast("success", "Contribuyente agregado exitosamente");
      }
      onSuccess?.();
      onClose();
    } catch {
      const mensaje = isEdit ? "Error al actualizar contribuyente" : "Error al agregar contribuyente";
      showToast("error", mensaje);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar Contribuyente" : "Agregar Contribuyente"}
      subtitle={isEdit ? "Modifica los datos del contribuyente" : "Ingresa los datos del nuevo contribuyente"}
      footer={ModalFooter(onClose, isEdit, "contribuyente-form", "Contribuyente")}
    >
      <form id="contribuyente-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack size="lg">
          {/* DATOS PERSONALES */}
          <Section icon={<User size={18} />} title="Datos Personales">
            <Grid cols={3}>
              <Input
                label="Nombre(s)"
                placeholder="Ej. Juan Carlos"
                {...register("nombre")}
                error={errors.nombre}
              />
              <Input
                label="Apellido Paterno"
                placeholder="Ej. Pérez"
                {...register("apellido_paterno")}
                error={errors.apellido_paterno}
              />
              <Input
                label="Apellido Materno"
                placeholder="Ej. López"
                {...register("apellido_materno")}
                error={errors.apellido_materno}
              />
              <Input
                type="date"
                label="Fecha de Nacimiento"
                {...register("fecha_nacimiento")}
                error={errors.fecha_nacimiento}
              />
              <Input
                label="RFC"
                placeholder="Ej. LOPJ010285MQ7"
                required={false}
                {...register("rfc")}
                onInput={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                }}
                error={errors.rfc}
                optional
              />
              <InputPhone
                label="Teléfono"
                placeholder="Ej. 9515801224"
                {...register("telefono")}
                error={errors.telefono}
              />
            </Grid>
          </Section>

          <hr className="border-[var(--color-borde)]" />

          {/* DOMICILIO */}
          <Section icon={<MapPin size={18} />} title="Datos del Domicilio">
            <Grid cols={3}>
              <Input
                label="Calle"
                placeholder="Ej. Constitución"
                {...register("calle")}
                error={errors.calle}
              />
              <Input
                label="Número Exterior"
                placeholder="Ej. 15"
                {...register("numero_calle")}
                error={errors.numero_calle}
              />
              <Select
                label="Barrio"
                options={[
                  "San Pedro",
                  "San Francisco",
                  "La Asunción",
                  "La Soledad",
                ]}
                {...register("barrio")}
                error={errors.barrio}
              />
            </Grid>
          </Section>
        </Stack>
      </form>
    </BaseModal>
  );
}
