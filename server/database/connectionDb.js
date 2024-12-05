import { Sequelize } from 'sequelize'
import {
    DB_HOST,
    DB_PASSWORD,
    DB_USER,
    DB_DEV_NAME,
    DB_PORT,
    DB_TEST_NAME,
    NODE_ENV,
} from '../config.js'

// Determinar la base de datos según el entorno
const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME

// Configurar la conexión con Sequelize
const connectionDb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: DB_PORT,
    logging: false, // Deshabilita logs para mayor claridad
})

// Inicializar y autenticar la conexión a la base de datos
export const initializeDb = async () => {
    try {
        await connectionDb.authenticate()
        console.log(
            `🚀 Conexión exitosa a la base de datos "${DB_NAME}" en el host "${DB_HOST}:${DB_PORT}"`
        )
    } catch (error) {
        console.error(
            `😱 Error al conectar con la base de datos "${DB_NAME}" en "${DB_HOST}:${DB_PORT}":`,
            error.message
        )
        process.exit(1) // Detener el proceso si la conexión falla
    }
}

export default connectionDb