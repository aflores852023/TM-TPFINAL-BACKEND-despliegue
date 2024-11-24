import * as WorkspaceRepository from '../repositories/workspace.repository.js';

export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await WorkspaceRepository.getAllWorkspaces();
        res.status(200).json({ ok: true, data: workspaces });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching workspaces', error });
    }
};

export const getWorkspaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const workspace = await WorkspaceRepository.getWorkspaceById(id);
        if (!workspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, data: workspace });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error fetching workspace', error });
    }
};

export const createWorkspace = async (req, res) => {
    try {
        const newWorkspace = await WorkspaceRepository.createWorkspace(req.body);
        res.status(201).json({ ok: true, data: newWorkspace });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error creating workspace', error });
    }
};

export const updateWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWorkspace = await WorkspaceRepository.updateWorkspace(id, req.body);
        if (!updatedWorkspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, data: updatedWorkspace });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error updating workspace', error });
    }
};

export const deleteWorkspace = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkspace = await WorkspaceRepository.deleteWorkspace(id);
        if (!deletedWorkspace) return res.status(404).json({ ok: false, message: 'Workspace not found' });
        res.status(200).json({ ok: true, message: 'Workspace deleted successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error deleting workspace', error });
    }
};
