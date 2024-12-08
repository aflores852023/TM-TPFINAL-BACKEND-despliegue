import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema({
 
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    imageUrl: { type: String, required: true },

});

export default mongoose.model('Workspace', WorkspaceSchema);


