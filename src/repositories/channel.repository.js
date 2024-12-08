// src/repositories/channel.repository.js
import Channel from '../models/Channel.js';
import mongoose from 'mongoose'; // Importa mongoose
import Message from '../models/Message.js';
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id); 
const getAllChannels = async () => await Channel.find();
const getChannelById = async (id) => await Channel.findById(id);
const createChannel = async (data) => await Channel.create(data);
const updateChannel = async (id, data) => await Channel.findByIdAndUpdate(id, data, { new: true });
const deleteChannel = async (id) => await Channel.findByIdAndDelete(id);
export const getChannelsByWorkspace = async (workspaceId) => {
    try {
        if (!isValidObjectId(workspaceId)) {
            throw new Error('Invalid workspace ID format.');
        }

        const objectId = new mongoose.Types.ObjectId(workspaceId); // Convertir a ObjectId
        return await Channel.find({ workspaceId: objectId });
    } catch (err) {
        console.error('Error en getChannelsByWorkspace:', err.message);
        throw new Error(`Error fetching channels: ${err.message}`);
    }
};

export const getAllMessagesByChannelId = async (channelId) => {
    try {
        if (!isValidObjectId(channelId)) {
            throw new Error('Invalid channel ID format.');
        }

        const objectId = new mongoose.Types.ObjectId(channelId); // Convertir a ObjectId
        return await Message.find({ channelId: objectId });
    } catch (err) {
        console.error('Error en getAllMessagesByChannelId:', err.message);
        throw new Error(`Error fetching messages: ${err.message}`);
    }
};
export default { getAllChannels, getChannelById, createChannel, updateChannel, deleteChannel, getChannelsByWorkspace, getAllMessagesByChannelId };

