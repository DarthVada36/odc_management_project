import { config } from 'dotenv'

config()

export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_DEV_NAME = process.env.DB_DEV_NAME
export const DB_PORT = process.env.DB_PORT
export const PORT = process.env.PORT
export const DB_TEST_NAME = process.env.DB_TEST_NAME
export const NODE_ENV = process.env.NODE_ENV
export const JWT_SECRET = process.env.JWT_SECRET

console.log(PORT)