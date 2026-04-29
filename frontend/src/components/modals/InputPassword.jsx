import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Stack from "../../components/layouts/Stack.jsx";

export default function PasswordInput({
    label,
    required = false,
    name,
    register,
    error,
    placeholder = "• • • • • • • •",
    onChange,
    disabled = false,
    showIcon = true,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const inputClass = (hasError) => `w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] border text-sm outline-none        
   ${hasError
            ? "border-red-500 focus:ring-2 focus:ring-red-400"
            : "border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
        }`;

    return (
        <div className="w-full">
            <Stack size="xs">
                {label && (
                    <label className="text-sm font-medium">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative">

                    {/* Icono izquierdo */}
                    {showIcon && (
                        <Lock
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primario)]"
                        />
                    )}

                    {/* Input */}
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register(name)}
                        placeholder={placeholder}
                        className={inputClass(error)}
                        onChange={onChange}
                        disabled={disabled}
                    />

                    {/* Toggle mostrar/ocultar */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                            showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <Eye className="text-[var(--color-primario)] cursor-pointer" size={18} />
                        ) : (
                            <EyeOff className="text-[var(--color-primario)] cursor-pointer" size={18} />
                        )}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
            </Stack>
        </div>
    );
}