import { useState, useEffect, useMemo } from "react";
import { User, Check, X, HandCoins } from "lucide-react";
import { getUsuariosAPI, updateUsuarioEstadoAPI } from "../../services/usuarioService.js";
import { showToast } from "../../utils/alerts/toast.js";
import { alertConfirmation } from "../../utils/alerts/alert.js";
import { usuariosColumns } from "./usuarios.columns.jsx";
import PageLayout from "../../components/layouts/PageLayout.jsx";
import Stack from "../../components/layouts/Stack.jsx";
import SectionTittle from "../../components/titles/SectionTitle.jsx";
import StatsCards from "../../components/cards/StatsCards.jsx";
import Table from "../../components/table/Table.jsx";
import AddUsuarioModal from "../../components/features/usuarios/AddUsuarioModal.jsx";

export default function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [open, setOpen] = useState(false);
    const [usuarioEdit, setUsuarioEdit] = useState(null);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const data = await getUsuariosAPI();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const stats = useMemo(() => {
        return [
            {
                title: "Total Usuarios",
                value: usuarios.length,
                icon: <User size={26} />,
            },
            {
                title: "Usuarios Activos",
                value: usuarios.filter((u) => u.activo).length,
                icon: <Check size={26} />,
            },
            {
                title: "Usuarios Inactivos",
                value: usuarios.filter((u) => !u.activo).length,
                icon: <X size={26} />,
            },
            {
                title: "Total de Cajeros",
                value: usuarios.filter((u) => u.rol_usuario === "Cajero").length,
                icon: <HandCoins size={26} />,
            }
        ];
    }, [usuarios]);

    // Abrir modal para crear
    const handleAdd = () => {
        setUsuarioEdit(null);
        setOpen(true);
    };

    // Abrir modal para editar
    const handleEdit = (usuario) => {
        setUsuarioEdit(usuario);
        setOpen(true);
    };

    const handleToggleStatus = async (id, estadoActual) => {
        const nuevoEstado = !estadoActual;
        const mensaje = nuevoEstado
            ? "¿Deseas activar este usuario?"
            : "¿Deseas desactivar este usuario?";

        const confirmacion = await alertConfirmation(
            "Atención",
            mensaje,
            "warning",
        );
        if (!confirmacion) return;

        try {
            await updateUsuarioEstadoAPI(id, { estado: nuevoEstado });
            fetchUsuarios();
            showToast("success", "Usuario actualizado exitosamente");
        } catch (error) {
            showToast("error", "Error al actualizar el estado del usuario");
        }
    };

    return (
        <PageLayout>
            <Stack size="xl">
                <SectionTittle
                    text="Gestión de Usuarios"
                    onAdd={handleAdd}
                    textButton="Agregar Usuario"
                />
                {open && (
                    <AddUsuarioModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        usuario={usuarioEdit}
                        onSuccess={fetchUsuarios}
                    />
                )}
                <StatsCards stats={stats} />
                <Table
                    rows={usuarios}
                    columns={usuariosColumns(handleEdit, handleToggleStatus)}
                    getRowId={(row) => row.id_usuario}
                />
            </Stack>
        </PageLayout>
    );
}