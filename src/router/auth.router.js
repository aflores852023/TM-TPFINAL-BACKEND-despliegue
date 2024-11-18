import express from "express";
import { registerUserController } from "../controllers/auth.controller.js";

const authRouter = express.Router()

authRouter.post('/register', registerUserController)

export default authRouter