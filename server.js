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
//import seedDatabase from './seed.js'; // Importa la función de semilla

// Cargar variables de entorno
dotenv.config(); // Esto debe ir al principio

// Verifica que las variables de entorno están cargadas correctamente
console.log("API Key Intern desde ENV:", process.env.API_KEY_INTERN);

const app = express();
const PORT = ENVIROMENT.PORT || 3000;
const allowedOrigins = [
    'https://tm-tpfinal-despliegue.vercel.app', // Tu frontend en producción
    'http://localhost:3000', // Opcional, para pruebas locales

];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Permite el origen
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    credentials: true,
    optionsSuccessStatus: 200, // Para asegurar compatibilidad con navegadores antiguos
};

app.use(cors(corsOptions));
app.use(express.json());
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

// Función para verificar si las colecciones están vacías y hacer la carga de datos
const checkAndSeedDatabase = async () => {
    const usersCount = await mongoose.model('User').countDocuments();
    const workspacesCount = await mongoose.model('Workspace').countDocuments();
    const channelsCount = await mongoose.model('Channel').countDocuments();
    const messagesCount = await mongoose.model('Message').countDocuments();

    if (usersCount === 0 || workspacesCount === 0 || channelsCount === 0 || messagesCount === 0) {
        console.log('Colecciones vacías, ejecutando seed...');
        await seedDatabase();
    } else {
        console.log('Las colecciones ya contienen datos.');
    }
};

// Ejecutar la verificación al iniciar el servidor
//checkAndSeedDatabase().then(() => {
app.listen(PORT, () => {
    console.log(`El servidor se esta escuchando en http://localhost:${PORT}`);
});
//}).catch((error) => {
//    console.error('Error al verificar las colecciones o ejecutar el seed:', error);
//});
