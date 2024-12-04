import bcryptjs from "bcryptjs";

// Encripta una contraseña usando bcrypt y devuelve el hash generado
export const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash
};

// Comprobar contraseña sin exponerla
export const compare = async (passwordPlain, hashedPassword) => {
  return await bcryptjs.compare(passwordPlain, hashedPassword);
};