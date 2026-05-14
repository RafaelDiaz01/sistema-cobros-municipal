export const formatPhone = (telefono) => {
  if (!telefono) return "";

  const digitos = String(telefono);

  // Si no vienen 10 dígitos, regresamos el valor original sin formato
  if (!/^\d{10}$/.test(digitos)) return digitos;

  return `${digitos.slice(0, 3)}-${digitos.slice(3, 6)}-${digitos.slice(6, 10)}`;
};

export default formatPhone;