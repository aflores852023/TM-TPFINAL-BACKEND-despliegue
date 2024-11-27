import mongoose from 'mongoose';
 

const ChannelSchema = new mongoose.Schema({
    id : { type: BigInt, required: true, unique: true, autoIncrement: true },
    name: { type: String, required: true },
    workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
});

export default mongoose.model('Channel', ChannelSchema);
