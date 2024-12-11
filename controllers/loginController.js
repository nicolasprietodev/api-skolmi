import redisClient from "../config/redis.js";
import { LoginModel } from "../models/loginModel.js";

export class LoginController {
  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await LoginModel.getCorreo({ email, password });

      if (!user || !(await this.LoginModel.validatePassword(password,user.password))) {
        return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
      }
      await redisClient.set(
        `refreshToken:${user.id}`,
        refreshToken,
        "EX",
        7 * 24 * 60 * 60
      );
  
      res.status(200).json({ message: 'Inicio de sesion exitoso' ,accessToken, refreshToken });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}
