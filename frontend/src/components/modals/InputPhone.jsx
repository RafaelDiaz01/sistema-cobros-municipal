import Stack from "../layouts/Stack.jsx";

function InputPhone({ label, error, disabled, ...props }) {
    return (
        <Stack size="xs">
            {/* LABEL */}
            <label className="text-sm font-medium">
                {label} <span className="text-red-500">*</span>
            </label>

            {/* INPUT */}
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                {...props}
                disabled={disabled}
                onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
                }}
                className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
            />

            {/* HELPER */}
            {error && <p className="text-xs text-gray-400">{error}</p>}
        </Stack>
    );
}
export default InputPhone;
