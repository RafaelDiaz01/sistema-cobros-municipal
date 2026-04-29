export const inputClass = (hasError) =>
    `w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] border text-sm outline-none        
   ${hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-400"
        : "border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
    }`;