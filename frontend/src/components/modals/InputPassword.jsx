import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { inputClass } from "./inputClass.js";
import Stack from "../../components/layouts/Stack.jsx";

export default function PasswordInput({
    label,
    required = false,
    name,
    register,
    error,
    hasServerError,
    placeholder = "• • • • • • • •",
    onChange,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = Boolean(error) || Boolean(hasServerError);
    const registeredInput = register(name);

    return (
        <Stack size="xs">
            {label && (
                <label className="text-sm font-medium text-gray-700" htmlFor={name}>
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primario)]"
                />
                <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    {...registeredInput}
                    placeholder={placeholder}
                    className={inputClass(hasError)}
                    onChange={(e) => {
                        registeredInput.onChange(e);  // Captura el valor primero
                        onChange?.(e);                // Luego limpia los errores
                    }}
                    disabled={disabled}
                />
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
            {hasError && (
                <p className="text-red-500 text-xs">
                    {error?.message}
                </p>
            )}
        </Stack>
    );
}