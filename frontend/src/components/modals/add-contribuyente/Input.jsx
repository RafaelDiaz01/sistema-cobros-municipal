import Stack from "../../layouts/Stack.jsx";

function Input({ label, helper, ...props }) {
  return (
    <Stack gap="gap-1.5">
      {/* LABEL */}
      <label className="text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* INPUT */}
      <input
        {...props}
        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400
            outline-none
            focus:border-[var(--color-acento)]
            focus:ring-1
            focus:ring-[var(--color-acento)]"
      />

      {/* HELPER */}
      {helper && <p className="text-xs text-gray-400">{helper}</p>}
    </Stack>
  );
}
export default Input;
