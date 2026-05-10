import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/validations/schemas";
import { User, BriefcaseBusiness, Key } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import {
    createUsuarioAPI,
    updateUsuarioAPI,
} from "../../../services/usuarioService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import InputPhone from "../../modals/InputPhone.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function AddUsuarioModal({ isOpen, onClose, onSuccess, usuario, }) {
    const isEdit = Boolean(usuario);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(createUserSchema),
    });

    useEffect(() => {
        if (isEdit && usuario) {
            reset({
                nombre_usuario: usuario.nombre_usuario,
                nombre_completo: usuario.nombre_completo,
                telefono: usuario.telefono,
                correo: usuario.correo,
                cargo: usuario.cargo,
                departamento: usuario.departamento,
                rol_usuario: usuario.rol_usuario,
            });
        }
    }, [isEdit, usuario, reset]);

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updateUsuarioAPI(usuario.id_usuario, data);
                showToast("success", "Usuario actualizado exitosamente");
            } else {
                await createUsuarioAPI(data);
                showToast("success", "Usuario creado exitosamente");
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error al guardar usuario", error);
            showToast("error", "Error al guardar usuario");
        }
    };

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={onClose}
            title={isEdit ? "Editar Usuario" : "Agregar Usuario"}
            subtitle={isEdit ? "Modifica los datos del usuario" : "Ingresa los datos del nuevo usuario"}
            footer={ModalFooter(onClose, isEdit, "usuario-form", "Usuario")}
        >
            <form id="usuario-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<User size={18} />} title="Información del Usuario">
                        <Grid cols={3}>
                            <Input
                                label="Nombre Completo"
                                placeholder="Ej: Juan Carlos Pérez"
                                {...register("nombre_completo")}
                                error={errors.nombre_completo}
                            />
                            <InputPhone
                                label="Telefono"
                                placeholder="Ej: 9512345678"
                                {...register("telefono")}
                                error={errors.telefono}
                            />
                            <Input
                                label="Correo Electrónico"
                                placeholder="Ej: juanperez@gmail.com"
                                {...register("correo")}
                                error={errors.correo}
                            />
                        </Grid>
                    </Section>
                    <Section icon={<BriefcaseBusiness size={18} />} title="Información del Trabajo">
                        <Grid cols={3}>
                            <Input
                                label="Cargo"
                                placeholder="Ej: Cajero Municipal"
                                {...register("cargo")}
                                error={errors.cargo}
                            />
                            <Input
                                label="Departamento"
                                placeholder="Ej: Tesorería Municipal"
                                {...register("departamento")}
                                error={errors.departamento}
                            />
                            <Select
                                label="Rol"
                                options={[
                                    "Administrador",
                                    "Cajero",
                                    "Auxiliar",
                                ]}
                                {...register("rol_usuario")}
                                error={errors.rol_usuario}
                            />
                        </Grid>
                    </Section>
                    {isEdit && (
                        <Section icon={<Key size={18} />} title="Información de Acceso">
                            <Grid cols={3}>
                                <Input
                                    label="Nombre de Usuario"
                                    placeholder="Ej: juan.perez"
                                    {...register("nombre_usuario")}
                                    error={errors.nombre_usuario}
                                />
                            </Grid>
                        </Section>
                    )}
                </Stack>
            </form>
        </ModalBase>
    );
}