import Stack from "../../layouts/Stack.jsx";

function Input({ label, required = true, error, disabled, ...props }) {
  return (
    <Stack size="xs">
      {/* LABEL */}
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* INPUT */}
      <input
        {...props}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
      />

      {/* HELPER */}
      {error && <p className="text-red-500 text-xs">{error?.message}</p>}
    </Stack>
  );
}
export default Input;
