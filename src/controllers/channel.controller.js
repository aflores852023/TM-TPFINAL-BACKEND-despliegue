import ChannelRepository from '../repositories/channel.repository.js';

import mongoose from 'mongoose';
export const getAllChannels = async (req, res) => {
    try {
        const channels = await ChannelRepository.getAllChannels();
        res.status(200).json({ ok: true, data: channels });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching channels', error });
    }
};

export const getChannelById = async (req, res) => {
    try {
        const { id } = req.params;
        const channel = await ChannelRepository.getChannelById(id);
        if (!channel) return res.status(404).json({ ok: false, message: 'Channel not found' });
        res.status(200).json({ ok: true, data: channel });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching channel', error });
    }
};

export const createChannel = async (req, res) => {
    try {
        const newChannel = await ChannelRepository.createChannel(req.body);
        res.status(201).json({ ok: true, data: newChannel });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error creating channel', error });
    }
};

export const updateChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedChannel = await ChannelRepository.updateChannel(id, req.body);
        if (!updatedChannel) return res.status(404).json({ ok: false, message: 'Channel not found' });
        res.status(200).json({ ok: true, data: updatedChannel });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error updating channel', error });
    }
};

export const deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChannel = await ChannelRepository.deleteChannel(id);
        if (!deletedChannel) return res.status(404).json({ ok: false, message: 'Channel not found' });
        res.status(200).json({ ok: true, message: 'Channel deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error deleting channel', error });
    }
};
// Obtener todos los canales asociados a un workspace específico
export const getChannelsByWorkspace = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId; // Acceso directo
        if (!workspaceId) {
            return res.status(400).json({ message: 'workspaceId is required' });
        }

        const channels = await ChannelRepository.getChannelsByWorkspace(workspaceId);
        if (!channels || channels.length === 0) {
            return res.status(404).json({ message: 'No channels found for this workspace' });
        }

        res.status(200).json({ ok: true, data: channels });
        

    } catch (error) {
        console.error('Error en getChannelsByWorkspace:', error); // Depuración del error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Obtener mensajes de un canal específico
export const getMessagesByChannel = async (req, res) => {
    const { channelId } = req.params;

    try {
        const messages = await db.Message.findAll({ where: { channelId } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes', error });
    }
};

// Crear un nuevo mensaje en un canal
export const createMessageInChannel = async (req, res) => {
    const { channelId } = req.params;
    const { content, senderId } = req.body;

    try {
        const message = await db.Message.create({ channelId, content, senderId });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el mensaje', error });
    }
};

export const getAllMessagesByChannelId = async (req, res) => {
    try {
        const messages = await MessageRepository.getAllMessagesByChannelId(req.params.channelId);
        res.status(200).json({ ok: true, data: messages });
        console.log('los mensajes del channel son ', messages);
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching messages con este error', error });
        console.error('el id del channel que llego al backend es ', req.params.channelId);
    }
};