import express from 'express';
import {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '../controllers/workspace.controller.js';
import { getChannelsByWorkspace } from '../controllers/channel.controller.js';


const router = express.Router();

// Rutas para Workspaces
// Nueva ruta: Obtener canales asociados a un Workspace
router.get('/:workspaceId/channels', getChannelsByWorkspace);
router.get('/', getAllWorkspaces);
router.get('/:id', getWorkspaceById);
router.post('/', createWorkspace);
router.put('/:id', updateWorkspace);
router.delete('/:id', deleteWorkspace);



export default router;