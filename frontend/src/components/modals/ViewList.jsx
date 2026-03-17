import Stack from "../layouts/Stack.jsx";

export default function ViewList({ labelKey, items, emptyMessage = "Sin datos disponibles" }) {
    // Validar que items sea un array válido
    const validItems = Array.isArray(items) ? items.filter(item => item !== null && item !== undefined && item !== "") : [];

    return (
        <Stack size="xs">
            <label className="text-sm font-medium text-[var(--color-text-primario)]">{labelKey}</label>
            <div className="flex flex-wrap gap-2 justify-between">
                {validItems.length > 0 ? (
                    validItems.map((item, idx) => (
                        <div
                            key={`item-${idx}-${item}`}
                            className="px-5 py-2 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-sm text-gray-800"
                        >
                            {String(item)}
                        </div>
                    ))
                ) : (
                    <span className="text-[var(--color-text-secundario)] text-sm italic">
                        {emptyMessage}
                    </span>
                )}
            </div>
        </Stack>
    );
}