import express, { json } from 'express'
import { createRouters } from './routes/index.js';
import dotenv from 'dotenv/config.js'
import { corsMiddleware } from './middleWares/corsMiddleware.js'

export const createApp = (models) => {
    const app = express()
    app.disable('x-powered-by')
    app.use(json())
    app.use(corsMiddleware())

    const { registerRouter, loginRouter } = createRouters(models)
    console.log('holi',models)


    app.use('/v1', registerRouter)
    app.use('/v1', loginRouter)

    return app
}   