

export class MatriculaController {
    constructor ({matriculaModel}){
        this.matriculaModel = matriculaModel;
    }

    getAllUsers = async (req, res) => {
        try {
          const restaurants = await this.matriculaModel.getAllUsers()
          res.json(restaurants)
        } catch (error) {
          res.status(500).json({ error: error.message })
        }
      }

    getUserById = async (req, res) => {
        try {
            const { idUser } = req.params;
            const user = await this.matriculaModel.getUserById({ 
                idUser
            })
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { idUser } = req.params;
            const updateUser = { nombre, apellido, correo, edad } = req.body;
            const result = await this.matriculaModel.updateUser({
                idUser,
                updateUser
            })
            res.status(200).json({
                message: 'User updated successfully',
                data: result
            })
        } catch (error) {
            if (error.message === 'User not found') {
                res.status(404).json({ error: error.message })
              } else {
                res.status(500).json({ error: error.message })
              }
        }
    }



}
