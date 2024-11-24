import * as MessageRepository from '../repositories/message.repository.js';

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
