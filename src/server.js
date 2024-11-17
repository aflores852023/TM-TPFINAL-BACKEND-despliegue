//servidor en express
import express from 'express';  

const app = express();  
const PORT = 3080;

app.get('/ping', (req, res) => {
    res.send('pong');   
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto https://localhost:${PORT}`);
});