import { updateEstablecimiento } from "../../services/establecimientoService.js";
import { createEstablecimiento } from "../../services/establecimientoService.js";
import { searchContribuyentes } from "../../services/contribuyentesService.jsx";
import { showToast } from "../../utils/alerts/toast.js";
import { X, Store, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Stack from "../layouts/Stack.jsx";
import Section from "./components/Section.jsx";
import Grid from "./components/Grid.jsx";
import Input from "./components/Input.jsx";
import Select from "./components/Select.jsx";
import SearchAutocomplete from "./components/SearchAutocomplete.jsx";

export default function AddEstablecimientoModal({
  onClose,
  onSuccess,
  establecimiento,
}) {
  const isEdit = Boolean(establecimiento);

  // Usando React Hook Form para manejar el formulario
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEdit && establecimiento) {
      reset({
        // Inicializar los campos del formulario con los datos del establecimiento
        nombre: establecimiento.nombre,
        giro: establecimiento.giro,
        id_contribuyente:
          establecimiento.contribuyente.nombre +
          " " +
          establecimiento.contribuyente.apellido_paterno,
        calle: establecimiento.calle,
        numero_calle: establecimiento.numero_calle,
        barrio: establecimiento.barrio,
      });
    }
  }, [isEdit, establecimiento, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateEstablecimiento(establecimiento.id_establecimiento, data);
        showToast("success", "Establecimiento actualizado exitosamente");
      } else {
        await createEstablecimiento(data);
        showToast("success", "Establecimiento guardado exitosamente");
      }
      onSuccess(); // notifica al padre para refrescar la lista
      onClose(); // cierra el modal
    } catch (error) {
      console.error(
        "Error al guardar establecimiento (AddEstablecimientoModal)",
        error,
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
              {isEdit
                ? "Editar Establecimiento"
                : "Agregar Nuevo Establecimiento"}
            </h2>
            <p className="text-sm text-gray-500">
              {isEdit
                ? "Modifique los datos del establecimiento."
                : "Complete el formulario para registrar un nuevo establecimiento en el sistema."}
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
              {/* DATOS DEL NEGOCIO*/}
              <Section
                icon={<Store size={18} />}
                title="Datos del Establecimiento"
              >
                <Grid>
                  <Input
                    label="Nombre del Establecimiento"
                    placeholder="Ej. La Roca"
                    {...register("nombre", {
                      required: "Este campo es obligatorio",
                    })}
                    error={errors.nombre?.message}
                  />
                  <Input
                    label="Giro"
                    placeholder="Ej. Tienda de abarrotes"
                    {...register("giro", {
                      required: "Este campo es obligatorio",
                    })}
                    error={errors.giro?.message}
                  />
                  {/* <Input
                    label="Propietario"
                    placeholder="Ej. Juan Pérez"
                    {...register("propietario", {
                      required: "Este campo es obligatorio",
                    })}
                    error={errors.propietario?.message}
                  /> */}
                  <SearchAutocomplete
                    name="id_contribuyente"
                    control={control}
                    label="Propietario"
                    placeholder="Buscar contribuyente por nombre..."
                    searchFn={searchContribuyentes} // función para buscar contribuyentes
                    getOptionLabel={(option) =>
                      `${option.nombre} ${option.apellido_paterno}`
                    }
                    getOptionValue={(option) => option.id_contribuyente}
                    // Integrar con react-hook-form
                    {...register("id_contribuyente", {
                      required: "Este campo es obligatorio",
                    })}
                  />
                  <Input
                    type="date"
                    label="Fecha de Apertura"
                    {...register("fecha_apertura", {
                      required: "Este campo es obligatorio",
                    })}
                    error={errors.fecha_apertura?.message}
                  />
                </Grid>
              </Section>

              <hr className="border-[var(--color-borde)]" />

              {/* UBICACIÓN */}
              <Section icon={<MapPin size={18} />} title="Ubicación">
                <Grid>
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
              {isEdit ? "Actualizar Establecimiento" : "Guardar Establecimiento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
