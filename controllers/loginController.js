import redisClient from "../config/redis.js";
import bcrypt from 'bcrypt'

export class LoginController {

  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const { correo, password } = req.body;

    try {
      const user = await this.loginModel.getCorreo({ correo, password });

       if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = generateAccessToken({ id: user.id, roleId: user.roleId });
    res.status(200).json({ message:'Inicio de sesion exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
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
