export const formatAddress = (calle, numero_calle, barrio) => {
    // Verificamos si es "SN" (ignorando mayúsculas/minúsculas)
    const isSN = numero_calle?.toString().toUpperCase() === "SN";

    // Si es "SN", lo ponemos sin el "#", si no, le agregamos el "#"
    const numero = isSN ? "SN" : `#${numero_calle}`;

    return `${calle} ${numero}, ${barrio}`;
};

export default formatAddress;