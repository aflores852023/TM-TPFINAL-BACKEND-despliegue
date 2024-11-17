//servidor en express
import express from 'express';
import  ResponseBuilder from './utils/builders/responseBuilders.js';

const app = express();
const PORT = 3000;

app.get('/ping', (req, res) => {
    
    try {
        const response = new ResponseBuilder()
            .setOk(true)
            .setMessage('Success')
            .setStatus(200)
            .setPayload({
                message: 'Pong'
            })
            .build()
            res.status(200).json(response)  
    } catch (error) {
        response
            .setOk(false)
            .setMessage('Interna server Error')
            .setStatus(500)
            .setPayload({
                message: error.message
            })
            .build()
            res.status(500).json(response)
    }
    
});
        
        

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto https://localhost:${PORT}`);
});