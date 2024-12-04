import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDb } from './database/connectionDb.js';
import { syncModels } from './models/indexModels.js';
<<<<<<< HEAD
import { adminRouter } from './routes/adminRoutes.js';
=======

import authRoutes from './routes/authRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import minorRoutes from './routes/minorRoutes.js'
import roleRoutes from './routes/roleRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

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

<<<<<<< HEAD
// Rutas
app.use('/api', adminRouter);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});
=======
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

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
<<<<<<< HEAD
  try {
    await initializeDb();
    console.log('Base de datos conectada exitosamente 🎉');

    await syncModels();
    console.log('Modelos sincronizados exitosamente 📚');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT} 🚀`);
      console.log(`Frontend URL: http://localhost:5173`);
      console.log(`API URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error(`Error al iniciar el servidor 😱:`, error.message);
    process.exit(1);
  }
};
=======
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
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  process.exit(1);
});

startServer();

export default app;