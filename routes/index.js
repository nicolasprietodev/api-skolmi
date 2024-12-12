import { createRegisterRouter } from './registerRouter.js'
import { createLoginRouter } from './loginRouter.js';
import createReporteRouter from './reporteRouter.js'

export const createRouters = (models) => {
    console.log('modelillos', models); 
    return {
        registerRouter: createRegisterRouter({ registerModel: models.RegisterModel}),
        loginRouter: createLoginRouter({ loginModel: models.LoginModel}),
        reporteRouter: createReporteRouter({ reporteModel: models.ReporteModel})
    }
}