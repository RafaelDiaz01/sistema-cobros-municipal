import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LockOpen, Lock, Eye } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import { cambiarPasswordAPI } from "../../../services/miPerfilService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import InputPhone from "../../modals/InputPhone.jsx";
import Select from "../../modals/components/Select.jsx";
import Stack from "../../layouts/Stack.jsx";
import Upload from "../../modals/components/Upload.jsx";
import ModalFooter from "../components/ModalFooter.jsx";

export default function PasswordModal({ isOpen, onClose, onSuccess }) {
    const isEdit = true;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await cambiarPasswordAPI(data);
            showToast("success", "Contraseña actualizada exitosamente");
            onSuccess();
            onClose();
        } catch (error) {
            showToast("error", "Error al actualizar la contraseña");
        }
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose} title="Cambiar Contraseña" footer={ModalFooter(onClose, isEdit, "password-form", "Contraseña")} maxWidth="max-w-md">
            <form id="password-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<LockOpen />} title="Seguridad Actual" >
                        <Input
                            label="Contraseña Actual"
                            placeholder="********"
                            type="password"
                            error={errors.password_usuario?.message}
                            {...register("password_usuario", { required: "La contraseña actual es requerida" })}
                        />
                    </Section>
                    <Section icon={<Lock />} title="Seguridad Nueva" >
                        <Input
                            label="Nueva Contraseña"
                            placeholder="********"
                            type="password"
                            error={errors.password_nueva?.message}
                            {...register("password_nueva", { required: "La nueva contraseña es requerida" })}
                        />
                        <Input
                            label="Confirmar Nueva Contraseña"
                            placeholder="********"
                            type="password"
                            error={errors.password_confirm?.message}
                            {...register("password_confirm", {
                                required: "La confirmación de la nueva contraseña es requerida"
                            })}
                        />
                    </Section>
                </Stack>
            </form>
        </ModalBase>
    );
};