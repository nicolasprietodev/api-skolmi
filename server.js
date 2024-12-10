import { createApp } from "./app.js";
import { models } from './models/index.js';

const app = createApp(models)

const PORT = process.env.PORT ?? 1235
    app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)

  })
