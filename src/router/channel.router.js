import express from 'express';
import {
  getAllChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
  getChannelsByWorkspace,
} from '../controllers/channel.controller.js';
import { createMessageInChannel, getMessagesByChannelId } from '../controllers/channel.controller.js';
const router = express.Router();

// Rutas CRUD generales
router.post('/:channelId/messages', createMessageInChannel);
router.get('/:channelId/messages', getMessagesByChannelId);
router.get('/workspaces/:workspaceId/channels', getChannelsByWorkspace);
router.get('/', getAllChannels);
router.get('/:id', getChannelById);
router.post('/', createChannel);
router.put('/:id', updateChannel);
router.delete('/:id', deleteChannel);




export default router;