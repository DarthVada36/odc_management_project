import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDb } from './database/connectionDb.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Puerto
const PORT = process.env.PORT || 3000;

// Inicializar servidor y base de datos
const startServer = async () => {
    try {
        // Inicializar la conexión a la base de datos
        await initializeDb();

        // Iniciar el servidor solo si la base de datos está conectada
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error(`😱 Error al iniciar el servidor:`, error.message);
        process.exit(1); // Detener el proceso si algo falla
    }
};

startServer();

export default app;
