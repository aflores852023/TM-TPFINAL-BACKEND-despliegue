import * as MessageRepository from '../repositories/message.repository.js';
import Message from '../models/Message.js';
import mongoose from 'mongoose';

export const getAllMessages = async (req, res) => {
    try {
        const messages = await MessageRepository.getAllMessages();
        res.status(200).json({ ok: true, data: messages });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching messages', error });
    }
};

export const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await MessageRepository.getMessageById(id);
        if (!message) return res.status(404).json({ ok: false, message: 'Message not found' });
        res.status(200).json({ ok: true, data: message });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching message', error });
    }
};

export const createMessage = async (req, res) => {
    try {
        const newMessage = await MessageRepository.createMessage(req.body);
        res.status(201).json({ ok: true, data: newMessage });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error creating message', error });
    }
};

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMessage = await MessageRepository.updateMessage(id, req.body);
        if (!updatedMessage) return res.status(404).json({ ok: false, message: 'Message not found' });
        res.status(200).json({ ok: true, data: updatedMessage });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error updating message', error });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await MessageRepository.deleteMessage(id);
        if (!deletedMessage) return res.status(404).json({ ok: false, message: 'Message not found' });
        res.status(200).json({ ok: true, message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error deleting message', error });
    }
};

export const getMessagesByChannelId = async (req, res) => {
    const { channel_id } = req.params;

    try {
        // Verificar si el `channel_id` es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(channel_id)) {
            return res.status(400).json({ ok: false, message: 'Invalid channel ID format.' });
        }

        // Buscar mensajes asociados al canal
        const messages = await Message.find({ channelId: channel_id }).exec();

        if (!messages.length) {
            return res.status(404).json({ ok: false, message: 'No messages found for this channel.' });
        }

        res.status(200).json({ ok: true, data: messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ ok: false, message: 'Error fetching messages', error });
    }
};
