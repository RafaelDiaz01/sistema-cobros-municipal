import { User } from "lucide-react";
import { inputClass } from "../../../components/modals/inputClass.js";
import Stack from "../../../components/layouts/Stack.jsx";

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