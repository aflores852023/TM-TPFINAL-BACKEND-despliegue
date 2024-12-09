import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    timestamp: { type: Date, default: Date.now },
    imageUrl: { type: String },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
});
export default mongoose.model('Message', MessageSchema);
