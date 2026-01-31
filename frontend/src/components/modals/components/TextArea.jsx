import { useState, useEffect } from "react";
import Stack from "../../layouts/Stack.jsx";

function TextArea({
  label,
  helper,
  rows = 4,
  maxLength,
  showCount = Boolean(maxLength),
  resize = "vertical", // 'none' | 'vertical' | 'both'
  value,
  defaultValue,
  onChange,
  required = false,
  error = false,
  className = "",
  disabled,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");

  useEffect(() => {
    if (value !== undefined) return;
    setInternalValue(defaultValue ?? "");
  }, [defaultValue]);

  const current = value !== undefined ? value : internalValue;
  const handleChange = (e) => {
    if (value === undefined) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const charCount = (current && String(current).length) || 0;

  return (
    <Stack size="xs">
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <textarea
        {...props}
        disabled={disabled}
        value={value !== undefined ? value : undefined}
        defaultValue={value === undefined ? internalValue : undefined}
        onChange={handleChange}
        rows={rows}
        maxLength={maxLength}
        style={{ resize }}
        className={`w-full border rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 outline-none bg-[#F9FAFB] text-gray-800
          ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : "border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"}
          ${className}`}
      />

      <div className="flex justify-between items-center">
        {helper ? (
          <p className={`text-xs ${error ? "text-red-500" : "text-gray-400"}`}>
            {helper}
          </p>
        ) : (
          <div />
        )}

        {(showCount || maxLength) && (
          <p className="text-xs text-gray-400 tabular-nums">
            {charCount}
            {maxLength ? `/${maxLength}` : ""}
          </p>
        )}
      </div>
    </Stack>
  );
}

export default TextArea;
