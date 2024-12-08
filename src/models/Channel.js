import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

export default mongoose.model('Channel', ChannelSchema);