import jwt from 'jsonwebtoken'
import { COOKIE_OPTIONS, JWT_TOKEN } from '../config/config.js'


export class LoginController {

  constructor ({ loginModel }) {
    this.loginModel = loginModel
  }

  login = async (req, res) => {
    const { correo, password } = req.body;
  
    try {
      const user = await this.loginModel.getCorreo({ correo, password });
  
      if (!user || !(await this.loginModel.validatePassword(password, user.hashedPassword))) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' })
      }

      const token = jwt.sign(
        { userId: user.user_id, username: user.username, password: user.password }
        , JWT_TOKEN,
        { expiresIn: '1h' })

      res.cookie('authToken', token, COOKIE_OPTIONS)
      res.status(200).json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
      console.error('Error en el controlador getLogin:', error)
      res.status(500).json({ message: 'Error al inicar sesion' })
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

