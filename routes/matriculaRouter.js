import { Router } from "express";
import { MatriculaController } from "../controllers/matriculaController";

export const createMatricularRouter = ({ matriculaModel }) => {
    const router = Router();
    const matriculaController = new MatriculaController({ matriculaModel })
    
    router.get('/users', matriculaController.getAllUsers);
    
}