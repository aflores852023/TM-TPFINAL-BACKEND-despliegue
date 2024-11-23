import dotenv from 'dotenv'

//Va a leer el archivo .env y guardara los valores en process.env
dotenv.config()

const ENVIROMENT = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
    API_KEY_INTERN: process.env.API_KEY_INTERN || 'defaultapikey', 
}

export default ENVIROMENT