import { useEffect } from "react";
import { useAuth } from "../../../context/authContext.jsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/validations/schemas";
import { User, Camera } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import { updatePerfilAPI, updateFotoPerfilAPI } from "../../../services/miPerfilService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import InputPhone from "../../modals/InputPhone.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import Upload from "../../modals/components/Upload.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

const URL = import.meta.env.VITE_API_URL;

export default function PerfilModal({ isOpen, onClose, onSuccess, user }) {
    const { refrescarPerfil } = useAuth();
    const isEdit = Boolean(user);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    useEffect(() => {
        if (isEdit && user) {
            reset({
                nombre_completo: user.nombre_completo,
                telefono: user.telefono,
                correo: user.correo
            });
        }
    }, [isEdit, user, reset]);

    const onSubmit = async (data) => {
        const { foto_perfil, ...perfilData } = data;
        try {
            if (isEdit) {
                await updatePerfilAPI(perfilData);

                // Si se subió una nueva foto, actualizarla también
                if (foto_perfil && foto_perfil.length > 0) {
                    const formData = new FormData();
                    formData.append("foto_perfil", foto_perfil[0]);
                    await updateFotoPerfilAPI(formData);
                } else {
                    showToast("info", "No se actualizó la foto de perfil");
                }
                showToast("success", "Perfil actualizado exitosamente");
                await refrescarPerfil(); // Refrescar datos del perfil en el contexto global
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
        <ModalBase isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Editar Perfil" : "Ver Perfil"}
            subtitle={"Modifique sus datos personales"}
            footer={ModalFooter(onClose, isEdit, "perfil-form", "Perfil")}>
            <form id="perfil-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<User size={18} />} title="Información Personal">
                        <Grid cols={3}>
                            <Input
                                label="Nombre Completo"
                                placeholder="Juan Carlos Pérez"
                                defaultValue=""
                                {...register("nombre_completo")}
                                error={errors.nombre_completo}
                            />
                            <InputPhone
                                label="Teléfono"
                                placeholder="9512345678"
                                defaultValue=""
                                {...register("telefono")}
                                error={errors.telefono}
                            />
                            <Input
                                label="Correo Electrónico"
                                placeholder="armandocruz@gmai.com"
                                defaultValue=""
                                {...register("correo")}
                                error={errors.correo}
                            />
                        </Grid>
                    </Section>

                    <Section icon={<Camera size={18} />} title="Foto de Perfil">
                        <Upload
                            name="foto_perfil"
                            field={register("foto_perfil")}
                            defaultImage={isEdit ? URL + user.foto_perfil : null}
                            error={errors.foto_perfil?.message}
                        />
                    </Section>
                </Stack>
            </form>
        </ModalBase>
    );
};