import express from 'express';
import {
  getAllChannels,
  getChannelById,
  createChannel,
  updateChannel,
  deleteChannel,
  getChannelsByWorkspace,
} from '../controllers/channel.controller.js';
import { getAllMessagesByChannelId } from '../controllers/channel.controller.js';
const router = express.Router();

// Rutas CRUD generales
router.get('/:channelId/messages', getAllMessagesByChannelId);
router.get('/workspaces/:workspaceId/channels', getChannelsByWorkspace);
router.get('/', getAllChannels);
router.get('/:id', getChannelById);
router.post('/', createChannel);
router.put('/:id', updateChannel);
router.delete('/:id', deleteChannel);




export default router;