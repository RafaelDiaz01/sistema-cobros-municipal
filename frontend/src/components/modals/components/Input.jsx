import Stack from "../../layouts/Stack.jsx";

function Input({ label, helper, disabled, ...props }) {
  return (
    <Stack size="xs">
      {/* LABEL */}
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* INPUT */}
      <input
        {...props}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] border-[#E5E7EB] text-gray-800 focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
      />

      {/* HELPER */}
      {helper && <p className="text-xs text-gray-400">{helper}</p>}
    </Stack>
  );
}
export default Input;
