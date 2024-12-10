import { createRegisterRouter } from './registerRouter.js'

export const createRouters = (models) => {
    console.log('modelillos', models); 
    return {
        registerRouter: createRegisterRouter({ registerModel: models.RegisterModel})
    }
}