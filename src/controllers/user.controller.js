import userRepository from '../repositories/user.repository.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json({ ok: true, users });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userRepository.getUserById(req.params.id);
        if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
        res.status(200).json({ ok: true, user });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};

// Similar para create, update, delete

export default { getAllUsers, getUserById }