import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tag } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import {
  createSubconceptoAPI,
  updateSubconceptoAPI,
} from "../../../services/subconceptoService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";

export default function AddSubconceptoModal({
  isOpen,
  onClose,
  onSuccess,
  subconcepto,
}) {
  const isEdit = Boolean(subconcepto);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEdit && subconcepto) {
      reset({
        nombre: subconcepto.nombre,
        clave_subconcepto: subconcepto.clave_subconcepto,
        monto_base: subconcepto.monto_base,
        periodicidad: subconcepto.periodicidad,
      });
    }
  }, [isEdit, subconcepto, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateSubconceptoAPI(subconcepto.id_subconcepto, data);
        showToast("success", "Subconcepto actualizado exitosamente");
      } else {
        await createSubconceptoAPI(data);
        showToast("success", "Subconcepto creado exitosamente");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar subconcepto", error);
      showToast("error", "Error al guardar subconcepto");
    }
  };

  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Editar Subconcepto" : "Nuevo Subconcepto"}
      subtitle={
        isEdit
          ? "Modifica los datos del subconcepto"
          : "Ingresa los datos del nuevo subconcepto"
      }
      footer={
        <div className="flex justify-end gap-4 bg-white rounded-b-2xl pt-5 pb-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[var(--color-cancelar)] text-[var(--color-text-secundario)] text-sm"
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="subconcepto-form"
            className="px-6 py-2 rounded-lg bg-[var(--color-acento)] text-[var(--color-text-secundario)] text-sm font-medium"
          >
            {isEdit ? "Actualizar Subconcepto" : "Guardar Subconcepto"}
          </button>
        </div>
      }
    >
      <form id="subconcepto-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack size="lg">
          <Section icon={<Tag size={18} />} title="Información del Subconcepto">
            <Input
              label="Nombre del Subconcepto"
              placeholder="Ej. Licencia de funcionamiento"
              {...register("nombre", {
                required: "Este campo es obligatorio",
              })}
              error={errors.nombre?.message}
            />
            <Grid cols={3}>
              <Input
                label="Clave del Subconcepto"
                placeholder="Ej. 41010011"
                {...register("clave_subconcepto", {
                  required: "Este campo es obligatorio",
                })}
                error={errors.clave_subconcepto?.message}
              />

              <Input
                label="Monto"
                placeholder="Ej. 250.00"
                {...register("monto_base", {
                  required: "Este campo es obligatorio",
                  min: {
                    value: 0,
                    message: "El monto debe ser mayor o igual a 0",
                  },
                })}
                error={errors.monto_base?.message}
              />

              <Select
                label="Periodicidad"
                options={[
                  "Único",
                  "Por Hora",
                  "Por Viaje",
                  "Por Kilómetro",
                  "Por Día",
                  "Por Evento",
                  "Mensual",
                  "Anual",
                ]}
                {...register("periodicidad", {
                  required: "Seleccione una periodicidad",
                })}
                error={errors.periodicidad?.message}
              />
            </Grid>
          </Section>
        </Stack>
        
      </form>
    </ModalBase>
  );
}
