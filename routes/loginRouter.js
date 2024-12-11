import { Router } from "express";
import { LoginController } from "../controllers/loginController.js";
import { authenticate } from "../middleWares/authMiddleware.js";

export const createLoginRouter = ({ loginModel }) => {
    const router = Router();
    const loginController = new LoginController({ loginModel });

    router.post('/login', authenticate, loginController.login);

    return router
}