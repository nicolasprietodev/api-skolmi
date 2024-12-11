export class RegisterController {

  constructor ({ registerModel }) {
    this.registerModel = registerModel
  }

  createUser = async (req, res) => {
    try {
      const { nombre, correo, password, roleId } = req.body
      console.log('Datos recibidos para crear usuario', {
        nombre,
        correo,
        password,
        roleId
        
      })
      const newUser = await this.registerModel.createUser({
        nombre,
        correo,
        password,
        roleId
        
      })
      res.status(201).json(newUser)


    } catch (error) {
      console.error('Error al crear el usuario: ', error)
      res.status(500).json({ error: error.message })
    }
  }


}
