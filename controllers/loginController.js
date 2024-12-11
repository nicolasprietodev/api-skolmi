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
  
      console.log(password,user.password)

      if (!user) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }

      const isPasswordValid = await this.loginModel.validatePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
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
  
  renderLogin (req, res) {
    res.render('login')
  }

  logout (req, res) {
    res.clearCookie('authToken')
    res.json({ message: 'Sesion cerrada exitosamente' })
  }

}

