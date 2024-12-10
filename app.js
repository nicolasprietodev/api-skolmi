import express, { json } from 'express'
import { createRouters } from './routes/index.js';
import dotenv from 'dotenv/config.js'

export const createApp = (models) => {
    const app = express()
    app.disable('x-powered-by')
    app.use(json())

    const { registerRouter } = createRouters(models)
    console.log('holi',models)


    app.use('/v1', registerRouter)

    return app
}   