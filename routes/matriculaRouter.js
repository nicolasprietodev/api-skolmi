import { Router } from "express";
import { MatriculaController } from "../controllers/matriculaController.js";
import { MatriculaModel } from "../models/matriculaModel.js";
import { ReferidoModel } from "../models/referidosModel.js";
import { UserModel } from "../models/userModel.js"; 

export const createMatricularRouter = () => {
    const router = Router();

    const matriculaController = new MatriculaController({
        matriculaModel: MatriculaModel,
        referidoModel: ReferidoModel,
        userModel: UserModel
    });

    router.post('/matriculas', matriculaController.createMatricula);
    router.get('/getAllMatriculas', matriculaController.getAllMatriculas)
    router.get('/getMatriculaById/:userId', matriculaController.getMatriculaById)
    router.get('/referidos/all', matriculaController.getAllReferidos)
    router.get('/referidos/:userId', matriculaController.getReferidoById)


    return router;
};
