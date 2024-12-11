import mongoose from "mongoose";
import ENVIROMENT from "../config/enviroment.config.js";

const connectDB = async () => {
    try {
        // Configuración de conexión con parámetros adicionales
        await mongoose.connect(ENVIROMENT.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true, // Asegura que SSL esté habilitado
            tlsAllowInvalidCertificates: false, // Rechaza certificados no válidos
        });
        console.log("Conexión exitosa a MongoDB Atlas");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error.message);
        process.exit(1); // Salida del proceso en caso de error crítico
    }
};

// Llamada a la función de conexión
connectDB();

export default mongoose;