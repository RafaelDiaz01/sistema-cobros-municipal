export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // true si existe
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
