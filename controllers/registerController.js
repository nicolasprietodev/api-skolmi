export class RegisterController {

  constructor ({ registerModel }) {
    this.registerModel = registerModel
  }

  createUser = async (req, res) => {
    try {
      const { nombre, correo, password, roleId, isActive } = req.body
      console.log('Datos recibidos para crear usuario', {
        nombre,
        correo,
        password,
        roleId,
        isActive
      })
      const newUser = await this.registerModel.createUser({
        nombre,
        correo,
        password,
        roleId,
        isActive
      })
      res.status(201).json(newUser)


    } catch (error) {
      console.error('Error al crear el usuario: ', error)
      res.status(500).json({ error: error.message })
    }
  }
}
