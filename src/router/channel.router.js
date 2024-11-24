import express from 'express';
import {
    getAllChannels,
    getChannelById,
    createChannel,
    updateChannel,
    deleteChannel,
} from '../controllers/channel.controller.js';

const router = express.Router();

// Rutas para Channels
router.get('/', getAllChannels);
router.get('/:id', getChannelById);
router.post('/', createChannel);
router.put('/:id', updateChannel);
router.delete('/:id', deleteChannel);

export default router;
