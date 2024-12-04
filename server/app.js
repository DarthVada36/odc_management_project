import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDb } from './database/connectionDb.js';
import { syncModels } from './models/indexModels.js';

import authRoutes from './routes/authRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import minorRoutes from './routes/minorRoutes.js'
import roleRoutes from './routes/roleRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Puerto
const PORT = process.env.PORT || 3000;

// Rutas

app.use('/api/auth', authRoutes);
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/minors', minorRoutes)
app.use('/api/roles', roleRoutes)
app.use('/api/admins', adminRoutes)

const startServer = async () => {
    try {
        await initializeDb()

        await syncModels()

        // Iniciar el servidor solo si la base de datos está conectada
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}🚀`)
        })
    } catch (error) {
        console.error(` Error al iniciar el servidor 😱`, error.message)
        process.exit(1)
    }
}

process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  process.exit(1);
});

startServer();

export default app;