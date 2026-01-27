import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { login } from "../../services/authService.jsx";
import logoUrl from "../../assets/images/logo-ixtlan.png";
import Stack from "../../components/layouts/Stack.jsx";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  // Usando React Hook Form para manejar el formulario
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError("");
      const response = await login(data);

      // Guardar el token y la información del usuario en el almacenamiento local
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.usuario));

      navigate("/contribuyentes");
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 401) {
        setLoginError("Usuario y/o contraseña incorrectos");
      } else {
        setLoginError("Error del servidor. Intente más tarde.");
      }
    }
  };

  const inputClass = (hasError) =>
    `w-full pl-10 pr-3 py-2 rounded-lg
                    bg-[#F9FAFB]
                    border
                    text-sm
                    outline-none
                    
   ${
     hasError
       ? "border-red-500 focus:ring-2 focus:ring-red-400"
       : "border-[#E5E7EB] focus:border-green-500 focus:ring-1 focus:ring-green-200"
   }`;

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      {/* FORMAS DECORATIVAS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-100 rounded-full opacity-60" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-green-200 rounded-full opacity-50" />

      {/* SVG SUAVE */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#22c55e"
          fillOpacity="0.08"
          d="M0,224L1440,96L1440,0L0,0Z"
        />
      </svg>

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
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* TITULO */}
              <h1 className="text-xl font-bold text-gray-900">
                Sistema de Cobros
              </h1>
              <p className="text-sm text-green-600">
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
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
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <button
                      type="button"
                      className="text-xs text-green-600 hover:underline"
                    >
                      ¿Olvidó su contraseña?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password_usuario", { required: true })}
                      placeholder="••••••••"
                      className={inputClass(loginError)}
                      onChange={() => setLoginError("")}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer"
                        />
                      ) : (
                        <EyeOff
                          size={18}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* RECORDAR SESIÓN */}
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  Mantener sesión iniciada
                </div>

                {/* BOTÓN */}
                <button
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="
                w-full py-3 rounded-lg
                bg-green-500
                text-white font-semibold text-sm
                hover:bg-green-600
                transition
              "
                >
                  Iniciar Sesión
                </button>
              </Stack>
            </form>

            {/* FOOTER*/}
            <p className="text-xs text-green-700">
              © 2026 Tesorería Municipal Ixtlán de Juárez.
              <br />
              Todos los derechos reservados.
            </p>
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
