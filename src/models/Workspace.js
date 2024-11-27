import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema({
    id : { type: BigInt, required: true, unique: true, autoIncrement: true },
    name: { type: String, required: true, unique: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    imageUrl: { type: String, required: true },

});

export default mongoose.model('Workspace', WorkspaceSchema);


