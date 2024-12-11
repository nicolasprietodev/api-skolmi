import express, { json } from 'express'
import { createRouters } from './routes/index.js';
import { corsMiddleware } from './middleWares/corsMiddleware.js'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import { fileURLToPath } from 'url'



// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export const createApp = (models) => {
    const app = express()

    // app.set('view engine', 'ejs')
    // app.set('views', path.join(__dirname, 'views'))

    app.use(corsMiddleware())
    app.disable('x-powered-by')
    app.use(json())
    app.use(cookieParser())

    const { registerRouter, loginRouter } = createRouters(models)
    console.log('holi',models)


    app.use('/v1', registerRouter)
    app.use('/v1', loginRouter)
    // app.use('/v1/dashboard', loginRouter)

    return app
}   