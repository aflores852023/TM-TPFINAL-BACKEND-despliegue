import express from "express";
import mongoose from './src/db/config.js';
import cors from 'cors';
import authRouter from "./src/router/auth.router.js";
import statusRouter from "./src/router/status.router.js";
import { verifyApikeyMiddleware } from "./src/middlewares/auth.middleware.js";
import dotenv from 'dotenv';
import ENVIROMENT from './src/config/enviroment.config.js';
import channelRouter from './src/router/channel.router.js';
import messageRouter from './src/router/message.router.js';
import workspaceRouter from './src/router/workspace.router.js';
import userRouter from './src/router/user.routes.js';

// Cargar variables de entorno
dotenv.config();

console.log("API Key Intern desde ENV:", process.env.API_KEY_INTERN);

const app = express();
const PORT = ENVIROMENT.PORT || 3000;

// Configuración de CORS
const corsOptions = {
    origin:  ENVIROMENT.URL_FRONT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
};
app.use(cors(corsOptions));

// Middleware para manejar solicitudes OPTIONS
app.options('*', (req, res) => {
    console.log('Solicitud OPTIONS recibida para:', req.path);
    res.sendStatus(204);
});

// Middleware de registro de solicitudes
app.use((req, res, next) => {
    console.log('Método:', req.method);
    console.log('Ruta:', req.path);
    console.log('Encabezado x-api-key:', req.headers['x-api-key']);
    console.log('Origen:', req.headers['origin']);
    next();
});

app.use(express.json());
app.use(verifyApikeyMiddleware); // Middleware para verificar la API Key

// Rutas
app.use('/api/channels', channelRouter);
app.use('/api/messages', messageRouter);
app.use('/api/workspaces', workspaceRouter);
app.use('/api/users', userRouter);
app.use('/api/status', statusRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).send('Backend operativo');
});

// Eventos de conexión a MongoDB
mongoose.connection.on('connected', () => {
    console.log('Conexión exitosa a MongoDB.');
});

mongoose.connection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`El servidor se está escuchando en http://localhost:${PORT}`);
});
