import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    id : { type: BigInt, required: true, unique: true, autoIncrement: true },
    text: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    timestamp: { type: Date, default: Date.now },
    imageUrl: { type: String },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
});
export default mongoose.model('Message', MessageSchema);
