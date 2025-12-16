import { User, Lock } from "lucide-react";
import AuthLayout from "../components/layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      {/* TITULO */}
      <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
        Sistema de Cobros Municipal
      </h1>

      <p className="text-gray-500 mb-8">Bienvenido a Ixtlán de Juárez</p>

      {/* USUARIO */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-700">Usuario</label>
        <div className="relative mt-1">
          <User
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Ingrese su usuario"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* CONTRASEÑA */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700">
          Contraseña
        </label>
        <div className="relative mt-1">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="password"
            placeholder="Ingrese su contraseña"
            className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* BOTÓN */}
      <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
        Acceder
      </button>

      {/* OLVIDASTE TU CONTRASEÑA */}
      <p className="text-center mt-4 text-sm text-gray-500 hover:underline cursor-pointer">
        ¿Olvidaste tu contraseña?
      </p>

      {/* LINEA DIVISORA */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* FOOTER */}
      <p className="text-center text-xs text-gray-400">
        © 2024 H. Ayuntamiento de Ixtlán de Juárez
      </p>
    </AuthLayout>
  );
};

export default Login;
