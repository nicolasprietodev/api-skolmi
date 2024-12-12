import { Router } from "express";
import { UserController } from "../controllers/userController.js";

export const createMatricularRouter = ({ userModel }) => {
    const router = Router();
    const userController = new UserController({ userModel })
    
    router.get('/users', userController.getAllUsers);
    router.get('/users/:userId', userController.getUserById);
    router.patch('/users/:userId', userController.updateUser);
    
    return router;
}