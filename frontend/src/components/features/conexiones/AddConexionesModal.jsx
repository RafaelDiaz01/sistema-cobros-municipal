import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../../utils/alerts/toast.js";
import { createConexionAPI, updateConexionAPI } from "../../../services/conexionService.js";
import { searchContribuyentes } from "../../../services/contribuyentesService.jsx";
import { MapPin, Tag } from "lucide-react";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import AsyncAutocomplete from "../../ui/AsyncAutocomplete.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddConexionModal({
    isOpen,
    onClose,
    onSuccess,
    conexion
}) {
    const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState(null);
    const [contribuyenteInput, setContribuyenteInput] = useState("");
    const isEdit = Boolean(conexion);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isEdit && conexion) {
            reset({
                tipo: conexion.tipo,
                uso: conexion.uso,
                id_contribuyente: conexion.contribuyente.id_contribuyente,
                fecha_conexion: conexion.fecha_conexion,
                calle: conexion.calle,
                numero_calle: conexion.numero_calle,
                barrio: conexion.barrio,
                referencia: conexion.referencia,
            });
            setContribuyenteSeleccionado(conexion.contribuyente);
            setContribuyenteInput(
                `${conexion.contribuyente.nombre} ${conexion.contribuyente.apellido_paterno} ${conexion.contribuyente.apellido_materno}`,
            );
        }
    }, [isEdit, conexion, reset]);

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updateConexionAPI(conexion.id_conexion, data);
                showToast("success", "Conexión actualizada existosamente");
            } else {
                await createConexionAPI(data);
                showToast("success", "Conexión creada exitosamente");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al guardar conexión", error);
            showToast("error", "Error al guardar conexión");
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Editar Conexión" : "Agregar Conexión"}
            subtitle={isEdit ? "Modifica los datos de la conexión" : "Ingresa los datos de la nueva conexión"}
            footer={
                ModalFooter(onClose, isEdit, "conexion-form", "Conexión")
            }
        >
            <form id="conexion-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<Tag size={18} />} title="Información de la Conexión">
                        <Grid cols={2}>
                            <Select
                                label="Tipo de Conexión"
                                options={[
                                    "Agua Potable",
                                    "Drenaje"
                                ]}
                                {...register("tipo", { required: "Tipo de conexión es requerido" })}
                                error={errors.tipo?.message}
                            />
                            <Select
                                label="Uso de la Conexión"
                                options={[
                                    "Residencial",
                                    "Comercial",
                                    "Industrial"
                                ]}
                                {...register("uso", { required: "Uso de la conexión es requerido" })}
                                error={errors.uso?.message}
                            />
                            <Stack size="xs">
                                <label className="text-sm font medium">
                                    {"Propietario de la Conexión"} <span className="text-red-500">*</span>
                                </label>
                                <AsyncAutocomplete
                                    value={contribuyenteSeleccionado}
                                    inputValue={contribuyenteInput}
                                    onSelect={(option) => {
                                        setContribuyenteSeleccionado(option);
                                        setValue("id_contribuyente", option.id_contribuyente);
                                    }}
                                    onInputChange={setContribuyenteInput}
                                    searchFn={searchContribuyentes}
                                    getOptionLabel={(option) =>
                                        option
                                            ? `${option.nombre} ${option.apellido_paterno} ${option.apellido_materno}`
                                            : ""
                                    }
                                    renderOption={(props, option) => {
                                        const { key, ...rest } = props;
                                        return (
                                            <li key={key} {...rest}>
                                                {option.nombre} {option.apellido_paterno} {option.apellido_materno}
                                            </li>
                                        );
                                    }}
                                    placeholder="Buscar contribuyente por nombre"
                                    disabled={isSubmitting}
                                />
                                {errors.id_contribuyente && (
                                    <span className="text-red-500 text-xs">
                                        {errors.id_contribuyente.message}
                                    </span>
                                )}
                            </Stack>
                            <Input
                                type="date"
                                label="Fecha de Apertura"
                                {...register("fecha_conexion", {
                                    required: "Este campo es obligatorio",
                                })}
                                error={errors.fecha_conexion?.message}
                            />
                        </Grid>
                    </Section>

                    <Section icon={<MapPin size={18} />} title="Ubicación de la Conexión">
                        <Grid cols={3}>
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
                        <Input
                            label="Referencia"
                            {...register("referencia", { required: "Referencia es requerida" })}
                            error={errors.referencia?.message}
                        />
                    </Section>
                </Stack>
            </form>
        </ModalBase>
    );
}