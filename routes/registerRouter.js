import { Router } from 'express'
import { RegisterController } from '../controllers/registerController.js'

export const createRegisterRouter = ({ registerModel }) => {
    const router = Router()

    const registerController = new RegisterController({ registerModel })

    router.post('/register', registerController.createUser)
    router.get('/users', registerController.getUsers)

    return router
}