import * as ChannelRepository from '../repositories/channel.repository.js';

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
