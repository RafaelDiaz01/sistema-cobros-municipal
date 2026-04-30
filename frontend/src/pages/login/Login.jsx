import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/schemas";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService.js";
import { useAuth } from "../../context/authContext.jsx";
import { showToast } from "../../utils/alerts/toast.js";
import Background from "./components/Background.jsx";
import logoUrl from "../../assets/images/logo-ixtlan.png";
import Stack from "../../components/layouts/Stack.jsx";
import Header from "./components/Header.jsx";
import InputUser from "./components/InputUser.jsx";
import InputPassword from "../../components/modals/InputPassword.jsx";
import Footer from "./components/Footer.jsx";
import GlobalFooter from "./components/GlobalFooter.jsx";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const spinnerTimerRef = useRef(null);
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
    spinnerTimerRef.current = setTimeout(() => {
      setShowSpinner(true);
    }, 300);

    try {
      await login(data);
      await checkAuth();
      if (isAuthenticated) {
        navigate("/cobrar", { replace: true });
      }
    } catch (error) {
      if (!error.response) {
        setLoginError("No se pudo conectar con el servidor");
        showToast("error", "No se pudo conectar con el servidor");
      } else if (
        error.response.status === 400 ||
        error.response.status === 401
      ) {
        setLoginError("Usuario y/o contraseña incorrectos");
        showToast("error", "Usuario y/o contraseña incorrectos");
      } else {
        setLoginError("Error del servidor. Intente más tarde.");
        showToast("error", "Error del servidor. Intente más tarde.");
      }
    } finally {
      clearTimeout(spinnerTimerRef.current);
      setShowSpinner(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center">
      {/* FONDO */}
      <Background />

      {/* CONTENIDO */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl px-8 py-10 text-center">
          <Stack size="md" className={"select-none"}>
            {/* HEADER */}
            <Header logoUrl={logoUrl} />

            {/* FORM */}
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <Stack size="md">
                {/* USUARIO */}
                <InputUser
                  name="nombre_usuario"
                  register={register}
                  error={errors.nombre_usuario}
                  hasServerError={Boolean(loginError)}
                  onChange={() => {
                    clearErrors("nombre_usuario");
                    setLoginError("");
                  }}
                />

                {/* CONTRASEÑA */}
                <div className="text-left">
                  <InputPassword
                    label="Contraseña"
                    name="password_usuario"
                    register={register}
                    error={errors.password_usuario}
                    hasServerError={Boolean(loginError)}
                    onChange={() => {
                      clearErrors("password_usuario");
                      setLoginError("");
                    }}
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
                  disabled={isSubmitting}
                  className="w-full h-12 py-3 rounded-lg bg-[var(--color-primario)] text-white font-semibold text-sm hover:bg-[var(--color-acento)] transition"
                >
                  {showSpinner ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                      Iniciando . . .
                    </span>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>
              </Stack>
            </form>

            {/* FOOTER*/}
            <Footer />
          </Stack>
        </div>
      </div>

      {/* FOOTER GLOBAL */}
      <GlobalFooter />
    </div>
  );
}
