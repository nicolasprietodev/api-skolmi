import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import { JWT_TOKEN } from "../config/config.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, JWT_TOKEN);

    const session = await redisClient.get(`session:${payload.id}`);
    if (!session) {
      return res.status(403).json({ error: "Sesión expirada o no válida" });
    }

    req.user = payload; 
    next(); 
  } catch (error) {
    console.error("Error al autenticar el token:", error.message);
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
