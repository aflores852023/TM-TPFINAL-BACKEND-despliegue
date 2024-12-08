// Rutas para Workspaces.router.js
import express from 'express';
import {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from '../controllers/workspace.controller.js';
import { getChannelsByWorkspace } from '../controllers/channel.controller.js';
import { verifyTokenMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Aplicar `verifyTokenMiddleware` a todas las rutas que necesitan autenticación

// Obtener canales de un workspace específico
router.get('/:workspaceId/channels', verifyTokenMiddleware(), getChannelsByWorkspace);

// Obtener todos los workspaces
router.get('/', verifyTokenMiddleware(), getAllWorkspaces);

// Obtener un workspace por su ID
router.get('/:id', verifyTokenMiddleware(), getWorkspaceById);

// Crear un nuevo workspace
router.post('/', verifyTokenMiddleware(), createWorkspace);

// Actualizar un workspace existente
router.put('/:id', verifyTokenMiddleware(), updateWorkspace);

// Eliminar un workspace
router.delete('/:id', verifyTokenMiddleware(), deleteWorkspace);

export default router;
