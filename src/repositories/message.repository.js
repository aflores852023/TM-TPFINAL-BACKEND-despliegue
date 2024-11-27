import Message from '../models/Message.js';

const getAllMessages = async () => await Message.find().populate('senderId', 'username').populate('channelId', 'name');
const getMessageById = async (id) => await Message.findById(id).populate('senderId', 'username').populate('channelId', 'name');
const createMessage = async (data) => await Message.create(data);
const updateMessage = async (id, data) => await Message.findByIdAndUpdate(id, data, { new: true });
const deleteMessage = async (id) => await Message.findByIdAndDelete(id);


export default { getAllMessages, getMessageById, createMessage, updateMessage, deleteMessage };