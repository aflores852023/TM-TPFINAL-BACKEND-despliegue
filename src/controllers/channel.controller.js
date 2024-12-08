import ChannelRepository from '../repositories/channel.repository.js';
import Channel from '../models/Channel.js';
import Message from '../models/Message.js';
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
    const { channelId } = req.params;
    const { text, senderId, imageUrl } = req.body;

    try {
        // Validar que el `channelId` sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ ok: false, message: 'Invalid channel ID format.' });
        }

        // Validar que el `senderId` sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(senderId)) {
            return res.status(400).json({ ok: false, message: 'Invalid sender ID format.' });
        }

        // Validar que el texto no esté vacío
        if (!text || text.trim() === '') {
            return res.status(400).json({ ok: false, message: 'Message text is required.' });
        }

        // Verificar si el canal existe
        const channel = await mongoose.model('Channel').findById(channelId);
        if (!channel) {
            return res.status(404).json({ ok: false, message: 'Channel not found.' });
        }

        // Crear el mensaje
        const message = new mongoose.model('Message')({
            text,
            senderId: mongoose.Types.ObjectId(senderId),  
            channelId: mongoose.Types.ObjectId(channelId),  
            imageUrl,  
        });

        await message.save();

        // Responder con el mensaje creado
        res.status(201).json({ ok: true, data: message });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ ok: false, message: 'Error creating message.', error: error.message });
    }
};


export const getMessagesByChannelId = async (req, res) => {
    const { channelId } = req.params;

    try {
        // Validar que el channelId sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(channelId)) {
            return res.status(400).json({ ok: false, message: 'Invalid channel ID format.' });
        }

        // Buscar mensajes asociados al channelId
        const messages = await Message.find({ channelId }).exec();

        if (messages.length === 0) {
            return res.status(404).json({ ok: false, message: 'No messages found for this channel.' });
        }

        return res.status(200).json({ ok: true, data: messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ ok: false, message: 'Error fetching messages.', error: error.message });
    }
};