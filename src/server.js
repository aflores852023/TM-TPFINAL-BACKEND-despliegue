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


app.use(cors({ origin: 'https://tm-tpfinal-despliegue.vercel.app' }));
app.use(express.json({ limit: '5mb' }))


app.use('/api/status', statusRouter)
app.use('/api/auth', authRouter)
app.get('/', (req, res) => {
    res.status(200).send('Backend operativo');
});
app.use(verifyApikeyMiddleware)


app.listen(PORT, () => {
    console.log(`El servidor configurado con la BBDD en la url ${DB_URL} y el servidor de backend esta funcionando en la url http://localhost en el puerto ${PORT}`)
})