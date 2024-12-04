import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDb } from './database/connectionDb.js';
import { syncModels } from './models/indexModels.js';
import { adminRouter } from './routes/adminRoutes.js';

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

// Puerto
const PORT = process.env.PORT || 3000;

// Inicializar servidor y base de datos
const startServer = async () => {
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

process.on('unhandledRejection', (err) => {
  console.error('Error no manejado:', err);
  process.exit(1);
});

startServer();

export default app;