import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Tag } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { subconceptoSchema } from "../../../validations/schemas/subconcepto.schema.js";
import { showToast } from "../../../utils/alerts/toast.js";
import { createSubconceptoAPI, updateSubconceptoAPI } from "../../../services/subconceptoService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddSubconceptoModal({ isOpen, onClose, onSuccess, subconcepto }) {
  const isEdit = Boolean(subconcepto);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(subconceptoSchema)
  });

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
      title={isEdit ? "Editar Subconcepto" : "Agregar Subconcepto"}
      subtitle={isEdit ? "Modifica los datos del subconcepto" : "Ingresa los datos del nuevo subconcepto"}
      footer={ModalFooter(onClose, isEdit, "subconcepto-form", "Subconcepto")
      }
    >
      <form id="subconcepto-form" onSubmit={handleSubmit(onSubmit)}>
        <Stack size="lg">
          <Section icon={<Tag size={18} />} title="Datos del Subconcepto">
            <Input
              label="Nombre del Subconcepto"
              placeholder="Ej. Panaderías"
              {...register("nombre")}
              error={errors.nombre}
            />
            <Grid cols={3}>
              <Input
                label="Clave del Subconcepto"
                placeholder="Ej. 41010011"
                {...register("clave_subconcepto")}
                error={errors.clave_subconcepto}
              />

              <Input
                label="Monto"
                placeholder="Ej. 300.00"
                {...register("monto_base")}
                error={errors.monto_base}
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
                {...register("periodicidad")}
                error={errors.periodicidad}
              />
            </Grid>
          </Section>
        </Stack>
      </form>
    </ModalBase>
  );
}
