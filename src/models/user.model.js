//Aqui tendremos el modelo del usuario
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { //Nombre
        type: String,
        required: true
    },
    email: { //Email
        type: String,
        required: true,
        unique: true
    },
    password: { //Contraseña
        type: String, 
        required: true
    },
    emailVerified: { //Verificacion de email
        type: Boolean,
        default: false
    },
    verificationToken: { //Token de verificacion
        type: String,
        required: true
    },
    avatar: { //Avatar
        type: String, 
        required:false
    }
})

const User = mongoose.model('User', userSchema) //Modelo de usuario

export default User