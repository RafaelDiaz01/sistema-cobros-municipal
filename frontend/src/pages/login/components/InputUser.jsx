import Stack from "../../../components/layouts/Stack.jsx";
import { User } from "lucide-react";

const inputClass = (hasError) => `w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] border text-sm outline-none        
   ${hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-400"
        : "border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
    }`;

export default function InputUser({ name, register, error, onChange }) {
    const hasError = Boolean(error);

    return (
        <div className="text-left">
            <Stack size="xs">
                <label className="text-sm font-medium text-gray-700" htmlFor={name}>
                    Usuario
                </label>
                <div className="relative">
                    <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primario)]"
                    />
                    <input
                        id={name}
                        type="text"
                        {...register(name)}
                        placeholder="Ingrese su usuario"
                        className={inputClass(hasError)}
                        onChange={onChange}
                    />
                </div>
                {hasError && (
                    <p className="text-red-500 text-xs">
                        {error?.message}
                    </p>
                )}
            </Stack>
        </div>

    );
}