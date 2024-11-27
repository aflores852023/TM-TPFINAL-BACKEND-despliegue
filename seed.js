/*import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import Workspace from './src/models/Workspace.js';
import Channel from './src/models/Channel.js';
import Message from './src/models/Message.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtener la URL de conexión desde la variable de entorno
const DB_URL = process.env.DB_URL;

//mongoose.connect(DB_URL, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
//}).then(() => console.log('Connected to MongoDB')).catch((err) => console.log('Error connecting to MongoDB:', err));

const seedDatabase = async () => {
  try {
    // Datos de prueba para usuarios
    const usersData = [
      { name: 'alice', email: 'alice@example.com', password: 'password123', emailVerified: true, verificationToken: 'token1', avatar: '/img/picture2.jpg' },
      { name: 'bob', email: 'bob@example.com', password: 'password123', emailVerified: false, verificationToken: 'token2', avatar: '/img/picture1.jpg' },
      { name: 'charlie', email: 'charlie@example.com', password: 'password123', emailVerified: true, verificationToken: 'token3', avatar: '/img/picture3.jpg' },
      { name: 'dave', email: 'dave@example.com', password: 'password123', emailVerified: false, verificationToken: 'token4', avatar: '/img/picture4.jpg' },
    ];

    // Insertar usuarios
    //const users = await User.insertMany(usersData);

    // Datos de prueba para espacios de trabajo
    const workspacesData = [
      { id: 1, name: 'Workspace 1', members: [users[0]._id, users[1]._id, users[2]._id], imageUrl: '/img/logoworkspace.jpg' },
      { id: 2, name: 'Workspace 2', members: [users[1]._id, users[2]._id, users[3]._id], imageUrl: '/img/logoworkspace.jpg' },
      { id: 3, name: 'Workspace 3', members: [users[1]._id, users[2]._id, users[3]._id], imageUrl: '/img/logoworkspace.jpg' },
    ];

    // Insertar espacios de trabajo
    //const workspaces = await Workspace.insertMany(workspacesData);

    // Datos de prueba para canales
    const channelsData = [
      { id: 1, name: 'General', workspaceId: workspaces[0].id },
      { id: 2 , name: 'Random', workspaceId: workspaces[0].id },
      { id: 3 , name: 'Development', workspaceId: workspaces[1].id },
      { id: 4 , name: 'Design', workspaceId: workspaces[1].id },
      { id: 5 , name: 'Marketing', workspaceId: workspaces[2].id },
      { id: 6 , name: 'Marketing Outsider', workspaceId: workspaces[2].id },
    ];

    // Insertar canales
    //const channels = await Channel.insertMany(channelsData);

    // Datos de prueba para mensajes
    const messagesData = [
      { id: 1 , text: 'Hello, everyone!', senderId: users[0].id, channelId: channels[0].id, timestamp: new Date() },
      { id: 2 , text: 'Hi Alice!', senderId: users[1].id, channelId: channels[0].id, timestamp: new Date() },
      { id: 3 , text: 'How is the project going?', senderId: users[2].id, channelId: channels[2].id, timestamp: new Date() },
      { id: 4 , text: 'We need to finish the design by Friday.', senderId: users[3].id, channelId: channels[3].id, timestamp: new Date() },
    ];

    // Insertar mensajes
    //const messages = await Message.insertMany(messagesData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

export default seedDatabase;*/
