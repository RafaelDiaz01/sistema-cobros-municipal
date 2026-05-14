import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Tag } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import {
    createBaseCatastralAPI,
    updateBaseCatastralAPI,
} from "../../../services/baseCatastralService.js";
import { searchContribuyentes } from "../../../services/contribuyentesService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import AsyncAutocomplete from "../../ui/AsyncAutocomplete.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddBaseCatastralModal({
    isOpen,
    onClose,
    onSuccess,
    baseCatastral,
}) {
    const [contribuyenteSeleccionado, setContribuyenteSeleccionado] = useState(null);
    const [contribuyenteInput, setContribuyenteInput] = useState("");
    const isEdit = Boolean(baseCatastral);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isEdit && baseCatastral) {
            reset({
                impuesto_calculado: baseCatastral.impuesto_calculado,
                fecha_avaluo: baseCatastral.fecha_avaluo,
                valor: baseCatastral.valor,
                id_contribuyente: baseCatastral.contribuyente.id_contribuyente,
                calle: baseCatastral.calle,
                numero_calle: baseCatastral.numero_calle,
                barrio: baseCatastral.barrio,
            });
            setContribuyenteSeleccionado(baseCatastral.contribuyente);
            setContribuyenteInput(
                `${baseCatastral.contribuyente.nombre} ${baseCatastral.contribuyente.apellido_paterno} ${baseCatastral.contribuyente.apellido_materno}`,
            );
        }
    }, [isEdit, baseCatastral, reset]);

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updateBaseCatastralAPI(baseCatastral.id_base_catastral, data);
                showToast("success", "Base Catastral actualizada exitosamente");
            } else {
                await createBaseCatastralAPI(data);
                showToast("success", "Base Catastral creada exitosamente");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al guardar Base Catastral", error);
            showToast("error", "Error al guardar Base Catastral");
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Editar Base Catastral" : "Agregar Base Catastral"}
            subtitle={isEdit ? "Modifica los datos de la base catastral" :
                "Ingresa los datos de la nueva base catastral"
            }
            footer={
                ModalFooter(onClose, isEdit, "base-catastral-form", "Base Catastral")
            }
        >
            <form id="base-catastral-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<Tag size={18} />} title="Información de la Base Catastral">
                        <Grid cols={2}>
                            <Input
                                label="Valor"
                                defaultValue=""
                                error={errors.valor?.message}
                                {...register("valor", {
                                    required: "El valor es obligatorio",
                                    valueAsNumber: true,
                                })}
                            />
                            <Input
                                label="Impuesto Calculado"
                                defaultValue=""
                                error={errors.impuesto_calculado?.message}
                                {...register("impuesto_calculado", { required: "El impuesto es obligatorio" })}
                            />
                            <Stack size="xs">
                                <label className="text-sm font medium">
                                    {"Propietario"} <span className="text-red-500">*</span>
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
                                label="Última Fecha de Avalúo"
                                defaultValue=""
                                error={errors.fecha_avaluo?.message}
                                {...register("fecha_avaluo", {
                                    required: "La fecha es obligatoria",
                                })}
                            />
                        </Grid>
                    </Section>

                    <Section icon={<MapPin size={18} />} title="Ubicación de la Base Catastral">
                        <Grid cols={3}>
                            <Input
                                label="Calle"
                                defaultValue=""
                                error={errors.calle?.message}
                                {...register("calle", { required: "La calle es obligatoria" })}
                            />
                            <Input
                                label="Número Exterior / Interior"
                                defaultValue=""
                                error={errors.numero_calle?.message}
                                {...register("numero_calle", { required: "El número es obligatorio" })}
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
            </form>
        </ModalBase>
    );
}