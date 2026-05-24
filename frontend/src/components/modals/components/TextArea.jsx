import Stack from "../../layouts/Stack.jsx";

function TextArea({
  label,
  required = false,
  error,
  disabled,
  ...props
}) {
  return (
    <Stack size="xs">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        {...props}
        disabled={disabled}
        className="w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] text-gray-800
          border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </Stack>
  );
}

export default TextArea;
