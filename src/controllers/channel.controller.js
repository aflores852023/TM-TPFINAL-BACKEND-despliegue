import ChannelRepository from '../repositories/channel.repository.js';
import Channel from '../models/Channel.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();


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
        const { name, workspaceId } = req.body;

        console.log('Datos recibidos para crear canal:', { name, workspaceId });

        if (!name || !workspaceId) {
            return res.status(400).json({ ok: false, message: 'Name and workspaceId are required.' });
        }

        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ ok: false, message: 'Invalid workspace ID format.' });
        }

        const newChannel = await Channel.create({ name, workspaceId });

        await Message.create({
            text: '¡Bienvenido al canal!',
            channelId: newChannel._id,
            senderId: null, // Valor nulo para mensajes del sistema
        });

        res.status(201).json({ ok: true, data: newChannel });
    } catch (error) {
        console.error('Error creating channel:', error.message);
        res.status(500).json({ ok: false, message: 'Error creating channel', error: error.message });
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
        const { workspaceId } = req.params;

        // Validar si el workspaceId es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return res.status(400).json({ ok: false, message: 'Invalid workspace ID format.' });
        }
        console.log('el valor del workspaceId para ir a buscar los channels asociados es:', workspaceId);

        const channels = await Channel.find({ workspaceId }).exec();

        if (!channels || channels.length === 0) {
            return res.status(404).json({ ok: false, message: 'No channels found for this workspace.' });
        }

        res.status(200).json({ ok: true, data: channels });
        console.log('los channels encontrados son:', channels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ ok: false, message: 'Error fetching channels', error });
    }
};


// Crear un nuevo mensaje en un canal
export const createMessageInChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { text } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const senderId = decoded ? decoded.id : SYSTEM_USER_ID; // Usa el ID del sistema si no hay usuario autenticado.

        if (!mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ ok: false, message: 'Invalid sender ID.' });
        }

        const message = await Message.create({
            text,
            senderId,
            channelId,
        });

        res.status(200).json({ ok: true, data: message });
    } catch (error) {
        console.error('Error al crear el mensaje:', error);
        res.status(500).json({ ok: false, message: 'Error creating message.', error: error.message });
    }
};


export const getMessagesByChannelId = async (req, res) => {
    const { channelId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ ok: false, message: 'Invalid channel ID format.' });
        }

        console.log('el valor del channelId para ir a buscar los mensajes asociados es:', channelId);

        // Ordenar los mensajes por el campo `timestamp` en orden ascendente
        const messages = await Message.find({ channelId }).sort({ timestamp: 1 }).exec();

        const formattedMessages = messages.map((message) => ({
            text: message.text || '',
            senderId: message.senderId || 'Unknown',
            imageUrl: message.imageUrl || '/default-avatar.png',
            timestamp: message.timestamp || Date.now(),
            status: message.status || 'Unknown',
        }));

        if (messages.length === 0) {
            return res.status(404).json({ ok: false, message: 'No messages found for this channel.' });
        }

        return res.status(200).json({ ok: true, data: formattedMessages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ ok: false, message: 'Error fetching messages.', error: error.message });
    }
};

