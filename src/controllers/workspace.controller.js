// controllers/workspace.controller.js
import * as WorkspaceRepository from '../repositories/workspace.repository.js';
import MessageRepository from '../repositories/message.repository.js';
import ChannelRepository from '../repositories/channel.repository.js';

import mongoose from 'mongoose'; // Importar mongoose
export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await WorkspaceRepository.getAllWorkspaces();
        res.status(200).json({ ok: true, data: workspaces });
    } catch (error) {
        console.error('Error fetching workspaces:', error);  
        res.status(500).json({ ok: false, message: 'Error fetching workspaces', error });
    }
};

export const getWorkspaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const workspace = await WorkspaceRepository.getWorkspaceById(id);
        if (!workspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, data: workspace });
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        res.status(500).json({ ok: false, message: 'Error fetching workspace', error });
    }
};

export const createWorkspace = async (req, res) => {
    try {
        const { name, imageUrl, members } = req.body;

        if (!name || !members) {
            return res.status(400).json({ message: 'Workspace name and members are required.' });
        }

        // Verifica que el usuario autenticado está presente
        if (!req.user) {
            return res.status(401).json({ message: 'User authentication required.' });
        }

        const objectIdMembers = members.map((id) => new mongoose.Types.ObjectId(id));
        const newWorkspace = await WorkspaceRepository.createWorkspace({
            name,
            members: objectIdMembers,
            imageUrl: imageUrl || '/img/default-workspace.jpg',
        });

        // Crear un canal predeterminado "General"
        const defaultChannel = {
            name: 'General',
            workspaceId: newWorkspace._id,
        };

        const createdChannel = await ChannelRepository.createChannel(defaultChannel);

        if (!createdChannel) {
            return res.status(500).json({
                message: 'Workspace created, but failed to create default channel.',
            });
        }

        // Crear un mensaje de bienvenida predeterminado en el canal "General"
        const welcomeMessage = {
            text: `¡Bienvenido al canal ${createdChannel.name}! Este es el lugar donde puedes empezar tus conversaciones.`,
            senderId: req.user.id, // Usuario autenticado como remitente
            channelId: createdChannel._id,
        };

        const createdMessage = await MessageRepository.createMessage(welcomeMessage);

        if (!createdMessage) {
            return res.status(500).json({
                message: 'Workspace and channel created, but failed to create welcome message.',
            });
        }

        res.status(201).json({
            workspace: newWorkspace,
            channel: createdChannel,
            welcomeMessage: createdMessage,
        });
    } catch (error) {
        console.error('Error creating workspace:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


export const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkspace = await WorkspaceRepository.updateWorkspace(id, req.body);
        if (!updatedWorkspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, data: updatedWorkspace });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error updating workspace', error });
    }
};

export const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkspace = await WorkspaceRepository.deleteWorkspace(id);
        if (!deletedWorkspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, message: 'Workspace deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error deleting workspace', error });
    }
};
