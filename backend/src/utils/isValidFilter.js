// Verifica si un filtro tiene un valor válido para ser utilizado en consultas.

export const isValidFilter = (value) => {
    if (value === undefined || value === null) {
        return false;
    }

    if (
        typeof value === "string" &&
        value.trim() === ""
    ) {
        return false;
    }

    return true;
};