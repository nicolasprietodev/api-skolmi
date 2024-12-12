
export class UserController {
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
            const { userId } = req.params;
            const user = await this.matriculaModel.getUserById({ 
                userId
            })
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    updateUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const { nombre, correo, telefono } = req.body;
            const result = await this.matriculaModel.updateUser({
                
                nombre, correo, telefono,userId
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

    deleteUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await this.matriculaModel.deleteUser({ userId })
            res.status(200).json({
                message: 'User deleted successfully',
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