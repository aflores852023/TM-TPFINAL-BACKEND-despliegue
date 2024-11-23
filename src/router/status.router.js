import express from "express";
import ResponseBuilder from "../utils/builders/responseBuilder.js";
import { getPingController } from "../controllers/status.controller.js";
import { verifyApikeyMiddleware, verifyTokenMiddleware } from "../middlewares/auth.middleware.js";

const statusRouter = express.Router()


statusRouter.get('/', (req, res) => {
    const response = new ResponseBuilder()
      .setOk(true)
      .setMessage("API Status endpoint is active")
      .setStatus(200)
      .build();
  
    res.status(200).json(response);
  });
statusRouter.get('/ping', getPingController)
statusRouter.get('/protected-route/ping', verifyTokenMiddleware(['admin', 'user']), getPingController)


export default statusRouter
