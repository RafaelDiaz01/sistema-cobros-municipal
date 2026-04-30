import { createContext, useContext, useState, useEffect } from "react";
import { logout } from "../services/authService.js";
import { getPerfilAPI } from "../services/miPerfilService.js";
import api from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica si existe sesión activa
  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.usuario);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Refrescar datos del perfil (incluye foto actualizada)
  const refrescarPerfil = async () => {
    try {
      const datosActualizados = await getPerfilAPI();
      setUser(datosActualizados);
    } catch (error) {
      console.error("Error al obtener datos del perfil:", error);
    }
  };

  // Persistir sesión al recargar página
  useEffect(() => {
    checkAuth();
  }, []);

  const cerrarSesion = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        checkAuth,
        refrescarPerfil,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
