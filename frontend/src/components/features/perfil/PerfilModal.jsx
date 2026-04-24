import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User, Camera } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import { updatePerfilAPI } from "../../../services/miPerfilService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import Upload from "../../modals/components/Upload.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function PerfilModal({ isOpen, onClose, onSuccess, user }) {
    const isEdit = Boolean(user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (isEdit && user) {
            reset({
                nombre_completo: user.nombre_completo,
                telefono: user.telefono,
            });
        }
    }, [isEdit, user, reset]);

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updatePerfilAPI(data);
                showToast("success", "Perfil actualizado exitosamente");
            } else {
                showToast("error", "No se puede crear un nuevo perfil");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al actualizar perfil", error);
            showToast("error", "Error al actualizar perfil");
        }
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title={isEdit ? "Editar Perfil" : "Ver Perfil"} footer={ModalFooter(onClose, isEdit, "perfil-form", "Perfil")}>
            <form id="perfil-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<User size={18} />} title="Información Personal">
                        <Grid cols={2}>
                            <Input
                                label="Nombre Completo"
                                defaultValue=""
                                {...register("nombre_completo", { required: "El nombre es requerido" })}
                                error={errors.nombre_completo?.message}
                            />
                            <Input
                                label="Teléfono"
                                defaultValue=""
                                {...register("telefono")}
                            />
                        </Grid>
                    </Section>

                    <Section icon={<Camera size={18} />} title="Foto de Perfil">
                        <Upload />
                    </Section>
                </Stack>
            </form>
        </ModalBase>
    );
};