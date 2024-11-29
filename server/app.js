import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initializeDb } from './database/connectionDb.js'
import { syncModels } from './models/indexModels.js'
import minorsRoutes from './routes/minorsRoutes.js';

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/minors', minorsRoutes);

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
   
    await initializeDb();

    await syncModels();

    // Iniciar el servidor solo si la base de datos está conectada
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}🚀`);
    });
  } catch (error) {
    console.error(` Error al iniciar el servidor 😱`, error.message);
    process.exit(1); 
  }
};

startServer()

export default app
