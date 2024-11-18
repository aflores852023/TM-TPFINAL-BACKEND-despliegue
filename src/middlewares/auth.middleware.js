import ENVIROMENT from "../config/enviroment.config.js"
import ResponseBuilder from "../utils/builders/responseBuilder.js"
import jwt from 'jsonwebtoken'


export const verifyTokenMiddleware = (roles_permitidos = []) => {

    return (req, res, next) => {
        try {
            const auth_header = req.headers['authorization']

            if (!auth_header) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setMessage('Falta token de autorizacion')
                    .setStatus(401)
                    .setPayload({
                        detail: 'Se espera un token de autorizacion'
                    })
                    .build()

                return res.status(401).json(response)
            }

            const access_token = auth_header.split(' ')[1]
            if (!access_token) {
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setMessage('El token de autorizacion esta malformado')
                    .setStatus(401)
                    .setPayload({
                        detail: 'Se espera un token de autorizacion'
                    })
                    .build()

                return res.status(401).json(response)
            }
            const decoded = jwt.verify(access_token, ENVIROMENT.JWT_SECRET)
            
            req.user = decoded

            //Si hay roles y no esta incluido el rol del usuario dentro de los roles permitidos, tiramos error
            if(roles_permitidos.length &&  !roles_permitidos.includes(req.user.role)){
                const response = new ResponseBuilder()
                    .setOk(false)
                    .setMessage('Acceso restringido')
                    .setStatus(403)
                    .setPayload({
                        detail: 'No tienes los permisos necesarios para realizar esta operacion'
                    })
                    .build()

                return res.status(403).json(response)
            }

            return next() //pasamos al sig controllador
        }
        catch (error) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Fallo al autentificar')
                .setStatus(401)
                .setPayload(
                    {
                        detail: error.message
                    }
                )
                .build()
            return res.status(401).json(response)
        }
    }

}

export const verifyApikeyMiddleware = (req, res, next) => {
    console.log('Middleware de API Key activo');

    try {
        // Busca la API key en el encabezado o en los parámetros de la URL
        const apikey_header = req.headers['x-api-key'];
        const apikey_query = req.query['x-api-key'];

        const apikey = apikey_header || apikey_query;

        console.log('API Key recibida:', apikey);

        if (!apikey) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Unauthorized')
                .setStatus(401)
                .setPayload({
                    detail: 'Se espera una API Key',
                })
                .build();

            return res.status(401).json(response);
        }

        if (apikey !== ENVIROMENT.API_KEY_INTERN) {
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Unauthorized')
                .setStatus(401)
                .setPayload({
                    detail: 'La API Key no es válida',
                })
                .build();

            return res.status(401).json(response);
        }

        next(); // Continúa con la siguiente capa de middleware o controlador
    } catch (error) {
        const response = new ResponseBuilder()
            .setOk(false)
            .setMessage('Error interno en el middleware')
            .setStatus(500)
            .setPayload({
                detail: error.message,
            })
            .build();

        return res.status(500).json(response);
    }
};


