import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/schemas";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "../../services/authService.js";
import { useAuth } from "../../context/authContext.jsx";
import Background from "./components/Background.jsx";
import logoUrl from "../../assets/images/logo-ixtlan.png";
import Stack from "../../components/layouts/Stack.jsx";
import InputPassword from "../../components/modals/InputPassword.jsx";
import Footer from "./components/Footer.jsx";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { checkAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      await login(data);
      await checkAuth();
      if (isAuthenticated) {
        navigate("/cobrar", { replace: true });
      }
    } catch (error) {
      if (!error.response) {
        setLoginError("No se pudo conectar con el servidor");
      } else if (
        error.response.status === 400 ||
        error.response.status === 401
      ) {
        setLoginError("Usuario y/o contraseña incorrectos");
      } else {
        setLoginError("Error del servidor. Intente más tarde.");
      }
    }
  };

  const inputClass = (hasError) =>
    `w-full pl-10 pr-3 py-2 rounded-lg bg-[#F9FAFB] border text-sm outline-none  
   ${hasError
      ? "border-red-500 focus:ring-2 focus:ring-red-400"
      : "border-[#E5E7EB] focus:border-[var(--color-acento)] focus:ring-1 focus:ring-[var(--color-acento)]"
    }`;

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      {/* FONDO */}
      <Background />

      {/* CONTENIDO */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-10 text-center">
          <Stack size="md">
            {/* LOGO */}
            <Stack size="xs">
              <div className="flex justify-center">
                <img
                  src={logoUrl}
                  alt="Logo Ayuntamiento"
                  className="w-24 h-26 object-contain"
                />
              </div>

              {/* TITULO */}
              <h1 className="text-xl font-bold text-gray-900">
                Sistema de Cobros
              </h1>
              <p className="text-sm font-medium text-black">
                H. Ayuntamiento de Ixtlán de Juárez
              </p>

              {loginError && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
                  {loginError}
                </div>
              )}
            </Stack>

            {/* FORM */}
            <form className="flex flex-col">
              <Stack size="md">
                {/* USUARIO */}
                <div className="text-left">
                  <label className="text-sm font-medium text-gray-700">
                    Usuario
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primario)]"
                    />
                    <input
                      type="text"
                      {...register("nombre_usuario", { required: true })}
                      placeholder="Ingrese su usuario"
                      className={inputClass(loginError)}
                      onChange={() => setLoginError("")}
                    />
                  </div>
                </div>

                {/* CONTRASEÑA */}
                <div className="text-left">
                  <label className="text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <InputPassword
                    name="password_usuario"
                    register={register}
                    error={loginError}
                    onChange={() => setLoginError("")}
                  />
                </div>

                {/* RECORDAR SESIÓN */}
                <div className="flex items-center gap-2 text-sm text-black">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                  />
                  Mantener sesión iniciada
                </div>

                {/* BOTÓN */}
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full py-3 rounded-lg bg-[var(--color-primario)] text-white font-semibold text-sm hover:bg-[var(--color-acento)] transition"
                >
                  Iniciar Sesión
                </button>
              </Stack>
            </form>

            {/* FOOTER*/}
            <Footer />
          </Stack>
        </div>
      </div>

      {/* FOOTER GLOBAL */}
      <div className="absolute bottom-4 w-full text-center text-xs text-black/80">
        ¿Necesita ayuda?{" "}
        <span className="font-semibold underline cursor-pointer">
          Soporte Técnico
        </span>
      </div>
    </div>
  );
}
