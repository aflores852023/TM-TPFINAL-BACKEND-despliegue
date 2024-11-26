import Workspace from '../models/Workspace.js';

const getAllWorkspaces = async () => await Workspace.find().populate('members', 'username avatar');
const getWorkspaceById = async (id) => await Workspace.findById(id).populate('members', 'username avatar');
const createWorkspace = async (data) => await Workspace.create(data);
const updateWorkspace = async (id, data) => await Workspace.findByIdAndUpdate(id, data, { new: true });
const deleteWorkspace = async (id) => await Workspace.findByIdAndDelete(id);

export  { getAllWorkspaces, getWorkspaceById, createWorkspace, updateWorkspace, deleteWorkspace };