import redisClient from "../config/redis.js";
import { LoginModel } from "../models/loginModel.js";

export class LoginController {

  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const { correo, password } = req.body;

    try {
      const user = await this.loginModel.getCorreo({ correo, password });

      if (
        !user ||
        !(await this.loginModel.validatePassword(password, user.password))
      ) {
        return res
          .status(401)
          .json({ message: "Usuario o contraseña incorrectos" });
      }
      await redisClient.set(
        `refreshToken:${user.id}`,
        refreshToken,
        "EX",
        7 * 24 * 60 * 60
      );

      res
        .status(200)
        .json({
          message: "Inicio de sesion exitoso",
          accessToken,
          refreshToken,
        });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };

  getUsers = async (req, res) => {
    try {
      const restaurants = await this.loginModel.getUser()
      res.json(restaurants)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

}
