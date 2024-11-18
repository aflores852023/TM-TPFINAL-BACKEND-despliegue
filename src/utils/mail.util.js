import transporter from "../config/transporter.config.js"

/**
 * Envia un email con el texto especificado al destinatario especificado
 * @param {string} text - El texto que se va a enviar en el email
 * @param {string} to - El destinatario del email
 */
const sendEmail = async (options) => {
    try{
        let response = await transporter.sendMail(options)

        /* 
        Ejemplo de response:
        {
            accepted: [ 'mati.dev.gimenez@gmail.com' ],
            rejected: [],
            ehlo: [
                'SIZE 35882577',
                '8BITMIME',
                'AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH',
                'ENHANCEDSTATUSCODES',
                'PIPELINING',
                'CHUNKING',
                'SMTPUTF8'
            ],
            envelopeTime: 558,
            messageTime: 595,
            messageSize: 266,
            response: '250 2.0.0 OK  1729000316 41be03b00d2f7-7ea9c6d2b56sm1353301a12.43 - gsmtp',
            envelope: { from: '', to: [ 'mati.dev.gimenez@gmail.com' ] },
            messageId: '<f83be084-f674-b51b-40db-3da266e649ce@localhost>'
        }
        */
    }
    catch(error){
        //Para poder trackear el error mejor y arreglarlo
        console.error('Error al enviar mail:', error)
        //Para que la funcion que invoque a esta funcion tambien le salte el error
        throw error
    }
}

export {sendEmail}