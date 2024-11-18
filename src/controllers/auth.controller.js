import ENVIROMENT from "../config/enviroment.config.js"
import User from "../models/user.model.js"
import ResponseBuilder from "../utils/builders/responseBuilders.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUserController = async (req, res) => {
    try{
        const {name, email, password} = req.body
        const existentUser = await User.findOne({email: email})
        console.log({existentUser})
        if(existentUser){
            const response = new ResponseBuilder()
            .setOk(false)
            .setStatus(400)
            .setMessage('Bad request')
            .setPayload(
                {
                    detail: 'El email ya esta en uso!'
                }
            )
            .build()
            return res.status(400).json(response)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = jwt.sign({email: email}, ENVIROMENT.JWT_SECRET, {
            expiresIn: '1d'
        })

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            emailVerified: false
        })
        await newUser.save()

        const response = new ResponseBuilder()
        .setOk(true)
        .setStatus(200)
        .setMessage('Created')
        .setPayload({})
        .build()
        return res.status(201).json(response)
    }
    catch(error){
        console.error('Error al registrar usuario:', error)
        const response = new ResponseBuilder()
        .setOk(false)
        .setStatus(500)
        .setMessage('Internal server error')
        .setPayload(
            {
                detail: error.message
            }
        )
        .build()
        return res.status(500).json(response)
    }

}

