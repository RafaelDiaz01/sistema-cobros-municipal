import bcrypt from "bcrypt";

// Función para hashear una contraseña
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generar una sal con 10 rondas
  return await bcrypt.hash(password, salt); // Retornar la contraseña hasheada
};

// Función para comparar una contraseña con su hash
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
