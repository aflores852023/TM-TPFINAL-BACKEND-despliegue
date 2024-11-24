import express from 'express';
import {
    getAllMessages,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage,
} from '../controllers/message.controller.js';

const router = express.Router();

// Rutas para Messages
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.post('/', createMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;
