import ENVIROMENT from "../config/enviroment.config.js"
import ResponseBuilder from "../utils/builders/responseBuilder.js"
import jwt from 'jsonwebtoken'


export const verifyTokenMiddleware = (roles_permitidos = []) => {
    return (req, res, next) => {
        try {
            const auth_header = req.headers['authorization'];
            if (!auth_header) {
                console.log('Falta el encabezado de autorización.');
                return res.status(401).json({
                    ok: false,
                    message: 'Falta token de autorización',
                    detail: 'Se espera un token de autorización',
                });
            }

            const access_token = auth_header.split(' ')[1];
            if (!access_token) {
                console.log('Token malformado.');
                return res.status(401).json({
                    ok: false,
                    message: 'El token de autorización está malformado',
                    detail: 'Se espera un token de autorización',
                });
            }

            // Decodifica y verifica el token
            console.log('Token recibido:', access_token);
            const decoded = jwt.verify(access_token, ENVIROMENT.JWT_SECRET);
            console.log('Token decodificado:', decoded);

            req.user = decoded;

            // Verifica roles si es necesario
            if (roles_permitidos.length && !roles_permitidos.includes(req.user.role)) {
                console.log('Acceso denegado. Rol no permitido:', req.user.role);
                return res.status(403).json({
                    ok: false,
                    message: 'Acceso restringido',
                    detail: 'No tienes los permisos necesarios para realizar esta operación',
                });
            }

            next(); // Pasa al siguiente middleware/controlador
        } catch (error) {
            console.error('Error al verificar el token:', error.message);
            return res.status(401).json({
                ok: false,
                message: 'Fallo al autenticar',
                detail: error.message,
            });
        }
    };
};

export const verifyApikeyMiddleware = (req, res, next) => {
    console.log('Middleware de API Key activo');
    console.log('la apikey recibida desde el front end es', req.headers['x-api-key'])

    try {
        // Busca la API Key en el encabezado o en los parámetros de la URL
        const apikey_header = req.headers['x-api-key'];
        const apikey_query = req.query['x-api-key'];

        // Selecciona la API Key (ya sea desde los encabezados o desde los parámetros de la URL)
        const apikey = apikey_header || apikey_query;

        // Depuración: Imprime la API Key interna y la recibida
        console.log('API Key interna desde ENV:', ENVIROMENT.API_KEY_INTERN);
        console.log('API Key recibida:', apikey);

        //  la API Key esté presente y sea válida
        if (!apikey || apikey.trim() !== ENVIROMENT.API_KEY_INTERN.trim()) {
            // Si la API Key no es válida, devuelve un error de autenticación
            console.log('API Key recibida:', apikey);  // Mostrar el valor de la API Key recibida
            console.log('API Key interna:', ENVIROMENT.API_KEY_INTERN); // Mostrar el valor de la API Key interna
            const response = new ResponseBuilder()
                .setOk(false)
                .setMessage('Unauthorized')
                .setStatus(401)
                .setPayload({
                    detail: 'La API Key no es válida. API Key interna:' 
                    + ENVIROMENT.API_KEY_INTERN + ' y la apikey recibida: ' 
                    + apikey  
                })
                .build();
            return res.status(401).json(response);
        }

        // Si la API Key es válida, pasa al siguiente middleware o controlador
        return next();
    } catch (error) {
        // Si ocurre un error durante el proceso, devuelve un error interno
        const response = new ResponseBuilder()
            .setOk(false)
            .setMessage('Error en la autenticación de la API Key')
            .setStatus(500)
            .setPayload({
                detail: error.message,
            })
            .build();
        return res.status(500).json(response);
    }
};