import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/validations/schemas";
import { LockOpen, Lock, Eye } from "lucide-react";
import { showToast } from "../../../utils/alerts/toast.js";
import { cambiarPasswordAPI } from "../../../services/miPerfilService.js";
import ModalBase from "../../ui/ModalBase.jsx";
import Section from "../../modals/components/Section.jsx";
import Grid from "../../modals/components/Grid.jsx";
import Input from "../../modals/components/Input.jsx";
import InputPhone from "../../modals/InputPhone.jsx";
import InputPassword from "../../modals/InputPassword.jsx";
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
    } = useForm({
        resolver: yupResolver(changePasswordSchema)
    });

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
        <ModalBase isOpen={isOpen} onClose={onClose} title="Cambiar Contraseña" subtitle="Modifique sus datos de seguridad" footer={ModalFooter(onClose, isEdit, "password-form", "Contraseña")} maxWidth="max-w-lg">
            <form id="password-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack size="lg">
                    <Section icon={<Lock size={18} />} title="Datos de Seguridad" >
                        <InputPassword
                            label="Contraseña Actual"
                            required={true}
                            name="password_usuario"
                            register={register}
                            error={errors.password_usuario}
                        />
                        <InputPassword
                            label="Contraseña Nueva"
                            required={true}
                            name="password_nueva"
                            register={register}
                            error={errors.password_nueva}
                        />
                        <InputPassword
                            label="Confirmar Contraseña Nueva"
                            required={true}
                            name="password_confirm"
                            register={register}
                            error={errors.password_confirm}
                        />
                    </Section>
                </Stack>
            </form>
        </ModalBase>
    );
};