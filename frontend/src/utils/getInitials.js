// Función para obtener las iniciales del nombre de usuario
export const getInitials = (nombreUsuario = "") => {
    if (!nombreUsuario.includes(".")) {
        return nombreUsuario.charAt(0).toUpperCase();
    }

    const partesNombre = nombreUsuario.split(".");

    const nombre = partesNombre[0] || "";
    const apellido = partesNombre[1] || "";

    const inicialNombre = nombre.charAt(0);
    const inicialApellido = apellido.charAt(0);

    return `${inicialNombre}${inicialApellido}`.toUpperCase();
};