import express, { json } from 'express'
import { createRouters } from './routes/index.js';
import { corsMiddleware } from './middleWares/corsMiddleware.js'
import cookieParser from 'cookie-parser'

export const createApp = (models) => {
    const app = express()

    app.use(corsMiddleware())
    app.disable('x-powered-by')
    app.use(json())
    app.use(cookieParser())

    const { registerRouter, loginRouter, matriculaRouter } = createRouters(models)
    console.log('holi',models)


    app.use('/v1', registerRouter)
    app.use('/v1', loginRouter)
    app.use('/v1/dashboard', matriculaRouter)

    return app
}   