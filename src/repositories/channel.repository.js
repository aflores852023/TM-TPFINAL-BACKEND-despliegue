import Channel from '../models/Channel.js';

const getAllChannels = async () => await Channel.find();
const getChannelById = async (id) => await Channel.findById(id);
const createChannel = async (data) => await Channel.create(data);
const updateChannel = async (id, data) => await Channel.findByIdAndUpdate(id, data, { new: true });
const deleteChannel = async (id) => await Channel.findByIdAndDelete(id);

export default { getAllChannels, getChannelById, createChannel, updateChannel, deleteChannel };