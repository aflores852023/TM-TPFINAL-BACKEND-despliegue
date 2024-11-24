import express from "express";
import userController from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.get('/', userController.getAllUsers);
UserRouter.get('/:id', userController.getUserById);
// Add POST, PUT, DELETE routes
export default UserRouter;
