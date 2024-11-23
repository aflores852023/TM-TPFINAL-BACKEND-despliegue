
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Verificar que las variables de entorno están cargadas correctamente
console.log("Variables de entorno cargadas:");
console.log("PORT:", process.env.PORT);
console.log("DB_URL:", process.env.DB_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("API_KEY_INTERN:", process.env.API_KEY_INTERN);

const ENVIROMENT = {
    PORT: process.env.PORT || 3000, // Si no existe, se usará el valor por defecto 3000
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    API_KEY_INTERN: process.env.API_KEY_INTERN,
    URL_FRONT: process.env.URL_FRONT || 'http://localhost:5173' // Valor por defecto si no está definido
};

export default ENVIROMENT;