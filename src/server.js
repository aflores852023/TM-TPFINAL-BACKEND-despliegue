import ENVIROMENT from "./config/enviroment.config.js";
import express from "express";
//lo dejamos porque es la conexion a la DB
import mongoose from './db/config.js'
import cors from 'cors'

import authRouter from "./router/auth.router.js";
import statusRouter from "./router/status.router.js";
import { verifyApikeyMiddleware } from "./middlewares/auth.middleware.js";




const app = express();
const PORT = ENVIROMENT.PORT || 3000
const DB_URL = ENVIROMENT.DB_URL

app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(verifyApikeyMiddleware)



app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`El servidor se esta escuchando en ${DB_URL} en el puerto ${PORT}`)
})