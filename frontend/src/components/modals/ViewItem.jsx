// Componente para mostrar datos en un modal
import Stack from "../layouts/Stack.jsx";

export default function ViewItem({ label, value }) {
    return (
        <Stack size="xs">
            <label className="text-sm font-medium">{label}</label>
            <div className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]">
                <p>
                    {value}
                </p>
            </div>
        </Stack>
    );
}