import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const createRouterUser = ({ userModel }) => {
    const router = Router();
    const userController = new UserController({ userModel })

    router.get('/users', userController.getAllUsers)

    return router
}