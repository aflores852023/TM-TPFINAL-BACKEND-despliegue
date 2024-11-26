import * as WorkspaceRepository from '../repositories/workspace.repository.js';

export const getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await WorkspaceRepository.getAllWorkspaces();
        res.status(200).json({ ok: true, data: workspaces });
    } catch (error) {
        console.error('Error fetching workspaces:', error);  
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
        console.error('Error fetching workspaces:', error);
        res.status(500).json({ ok: false, message: 'Error fetching workspace', error });
    }
};

export const createWorkspace = async (req, res) => {
    try {
        const { name, icon } = req.body;
        console.log('Cuerpo de la solicitud:', req.body);
        // Validar datos requeridos
        if (!name) {
            return res.status(400).json({ message: 'Workspace name is required.' });
        }
        const userId = req.body.members; // Usuario autenticado
        console.log('Usuario autenticado:', userId);    
        
        const imageUrl = req.body.imageUrl;

        console.log('URL de la imagen:', imageUrl);
        // Crear el nuevo workspace
        const newWorkspace = await WorkspaceRepository.createWorkspace({
            name,
            members: [userId],
            imageUrl: imageUrl || '/img/logoworkspace.jpg'
        });

        res.status(201).json(newWorkspace);
    } catch (error) {
        console.error('Error creating workspace:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
