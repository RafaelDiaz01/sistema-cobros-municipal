import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, MapPin } from "lucide-react";
import { createContribuyente, updateContribuyente, } from "../../../services/contribuyentesService.jsx";
import { showToast } from "../../../utils/alerts/toast.js";
import BaseModal from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddContribuyenteModal({ isOpen, onClose, onSuccess, contribuyente }) {
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
      showToast("error", "Error al guardar contribuyente");
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
                {...register("nombre", { required: true })}
                error={errors.nombre}
              />
              <Input
                label="Apellido Paterno"
                placeholder="Ej. Pérez"
                {...register("apellido_paterno", { required: true })}
                error={errors.apellido_paterno}
              />
              <Input
                label="Apellido Materno"
                placeholder="Ej. López"
                {...register("apellido_materno", { required: true })}
                error={errors.apellido_materno}
              />
              <Input
                type="date"
                label="Fecha de Nacimiento"
                {...register("fecha_nacimiento")}
              />
              <Input
                label="RFC"
                placeholder="LOPJ010285MQ7"
                {...register("rfc")}
                error={errors.rfc}
              />
              <Input
                label="Teléfono"
                placeholder="9515801224"
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
