const mxnFormat = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const formatCurrencyMXN = (input) => {
    // Verificar si el input es un objeto con una propiedad 'value'
    const raw =
        input && typeof input === "object" && "value" in input
            ? input.value
            : input;

    // Si el valor es nulo, indefinido o una cadena vacía, retornar el formato para 0
    if (raw === null || raw === undefined || raw === "") {
        return mxnFormat.format(0);
    }

    // Convertir el valor a número
    const numero = Number(raw);

    // Si el número es finito, formatearlo
    return Number.isFinite(numero) ? mxnFormat.format(numero) : mxnFormat.format(0);
};

export default formatCurrencyMXN;