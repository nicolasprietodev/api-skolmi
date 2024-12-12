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
        { userId: user.id_usuario, rol: user.rol, nombre: user.nombre }
        , JWT_TOKEN,
        { expiresIn: '1h' })

      const userId = user.id_usuario

      res.cookie('authToken', token, COOKIE_OPTIONS)
      res.status(200).json({ message: 'Inicio de sesión exitoso', token, userId})
    } catch (error) {
      console.error('Error en el controlador getLogin:', error)
      res.status(500).json({ message: 'Error al inicar sesion' })
    }
  };
  
  logout (req, res) {
    res.clearCookie('authToken')
    res.json({ message: 'Sesion cerrada exitosamente' })
  }

}

