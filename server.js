import express from "express";
import mongoose from './src/db/config.js';
import cors from 'cors';
import authRouter from "./src/router/auth.router.js";
import statusRouter from "./src/router/status.router.js";
import { verifyApikeyMiddleware } from "./src/middlewares/auth.middleware.js";
import dotenv from 'dotenv';  // Importa dotenv
import ENVIROMENT from './src/config/enviroment.config.js';  // Importa el archivo de configuración
import channelRouter from './src/router/channel.router.js';
import messageRouter from './src/router/message.router.js';
import workspaceRouter from './src/router/workspace.router.js';
import userRouter from './src/router/user.routes.js';




// Cargar variables de entorno
dotenv.config(); // Esto debe ir al principio

// Verifica que las variables de entorno están cargadas correctamente
console.log("API Key Intern desde ENV:", process.env.API_KEY_INTERN);

const app = express();
const PORT = ENVIROMENT.PORT || 3000;
const allowedOrigins = [ENVIROMENT.URL_FRONT];
app.use(cors({
    origin: allowedOrigins, // Permite solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'], // Encabezados permitidos
    credentials: true // Si necesitas enviar cookies o credenciales
}));
app.use(verifyApikeyMiddleware); // Middleware para verificar la API Key
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
app.use('/api/workspaces', workspaceRouter);
app.use('/api/users', userRouter);
app.use(express.json({ limit: '5mb' }));
app.use('/api/status', statusRouter);
app.use('/api/auth', authRouter);
app.get('/', (req, res) => {
    res.status(200).send('Backend operativo');
});

app.listen(PORT, () => {
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}`);
});