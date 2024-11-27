import Channel from '../models/Channel.js';
import mongoose from 'mongoose'; // Importa mongoose
import Message from '../models/Message.js';

const getAllChannels = async () => await Channel.find();
const getChannelById = async (id) => await Channel.findById(id);
const createChannel = async (data) => await Channel.create(data);
const updateChannel = async (id, data) => await Channel.findByIdAndUpdate(id, data, { new: true });
const deleteChannel = async (id) => await Channel.findByIdAndDelete(id);
export const getChannelsByWorkspace = async (workspaceId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(workspaceId); // Verificar que sea ObjectId válido

        return await Channel.find({ workspaceId: objectId });
    } catch (err) {
        console.error('Error en getChannelsByWorkspace:', err.message);
        throw new Error(`Error fetching channels: ${err.message}`);
    }
};

const getAllMessagesByChannelId = async (channelId) => {
    try {
    const objectId = new mongoose.Types.ObjectId(channelId); // Verificar que sea ObjectId válido
    return await Message.find({ channelId: objectId });
    }
    catch (err) {
        console.error('Error en getAllMessagesByChannelId:', err.message);
        throw new Error(`Error fetching messages con este error : ${err.message}`);
    }
};
export default { getAllChannels, getChannelById, createChannel, updateChannel, deleteChannel, getChannelsByWorkspace, getAllMessagesByChannelId };

